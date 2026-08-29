#!/bin/sh
# Secret scanner for EcoPet.
#
#   bash scripts/check-secrets.sh          # scan tracked files in the working tree
#   bash scripts/check-secrets.sh --staged # scan only what is staged (used by the pre-commit hook)
#
# Exits non-zero if anything looks like a leaked credential.
# See CLAUDE.md section 4 ("Key safety") for why each of these matters.

set -u

STAGED=0
[ "${1:-}" = "--staged" ] && STAGED=1

fail=0
note() { printf '\n\033[31mBLOCKED:\033[0m %s\n' "$1"; fail=1; }

if [ "$STAGED" -eq 1 ]; then
  files=$(git diff --cached --name-only --diff-filter=ACM)
  read_file() { git show ":$1" 2>/dev/null; }
else
  files=$(git ls-files)
  read_file() { cat "$1" 2>/dev/null; }
fi

# Never scan ourselves, or the file whose whole job is to show the placeholder shape.
files=$(printf '%s\n' "$files" | grep -v -e '^scripts/check-secrets.sh$' -e '^.gitignore$')

# --- 1. A .env file must never be committed (only .env.example may be) --------
for f in $files; do
  case "$f" in
    .env.example|*/.env.example) ;;
    .env|*/.env|.env.*|*/.env.*)
      note "$f is an environment file. Secrets belong in a gitignored .env, never in git." ;;
  esac
done

# --- 2. Real API keys in file contents ---------------------------------------
# Real OpenAI keys run 40+ chars after the prefix; the 20-char floor keeps the
# 'sk-proj-REPLACE_ME' placeholder from tripping this.
KEY_RE='sk-(proj-)?[A-Za-z0-9_-]{20,}'
for f in $files; do
  if read_file "$f" | grep -qE "$KEY_RE"; then
    note "$f appears to contain a live API key."
  fi
done

# --- 3. Any real value assigned to a secret-shaped variable ------------------
ASSIGN_RE='(OPENAI_API_KEY|API_KEY|SECRET|TOKEN|PASSWORD)[[:space:]]*[:=][[:space:]]*["'"'"']?[A-Za-z0-9_/+-]{16,}'
for f in $files; do
  case "$f" in
    *.example|*.md) continue ;;
  esac
  if read_file "$f" | grep -qE "$ASSIGN_RE" ; then
    note "$f assigns a real-looking value to a secret variable."
  fi
done

# --- 4. The key must never be reachable from the browser bundle -------------
# Vite inlines every VITE_* variable into public JS.
for f in $files; do
  case "$f" in
    frontend/*)
      if read_file "$f" | grep -qE 'OPENAI_API_KEY|VITE_[A-Z_]*(KEY|SECRET|TOKEN)'; then
        note "$f is frontend code referencing a secret. The key must only be read under backend/."
      fi ;;
  esac
done

if [ "$fail" -ne 0 ]; then
  cat <<'EOF'

Nothing was committed. To fix:
  1. Move the value into backend/.env  (gitignored) and set it in Vercel for production.
  2. If it was already committed, ROTATE THE KEY at
     https://platform.openai.com/api-keys — removing the file is not enough,
     it stays in git history.
  3. Re-run: bash scripts/check-secrets.sh

EOF
  exit 1
fi

printf '\033[32mOK:\033[0m no secrets detected.\n'
exit 0
