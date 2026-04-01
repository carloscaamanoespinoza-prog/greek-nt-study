#!/bin/bash
# Download data sources for Greek NT study app
# Sources: OpenGNT, Strong's Dictionary, STEPBible Lexicons

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCES_DIR="$PROJECT_ROOT/data-sources"

echo "📥 Downloading Greek NT data sources..."
echo "This will download ~500MB of data"
echo ""

# Create sources directory
mkdir -p "$SOURCES_DIR"
cd "$SOURCES_DIR"

# 1. Download OpenGNT
echo "1️⃣  Downloading OpenGNT (Greek NT + morphology)..."
if [ ! -d "OpenGNT" ]; then
  git clone --depth 1 https://github.com/eliranwong/OpenGNT.git
  echo "✅ OpenGNT downloaded"
else
  echo "ℹ️  OpenGNT already present"
fi

# 2. Download Strong's Dictionary
echo ""
echo "2️⃣  Downloading Strong's Dictionary (XML)..."
if [ ! -d "strongs-dictionary-xml" ]; then
  git clone --depth 1 https://github.com/morphgnt/strongs-dictionary-xml.git
  echo "✅ Strong's Dictionary downloaded"
else
  echo "ℹ️  Strong's Dictionary already present"
fi

# 3. Download STEPBible Data (includes LSJ and TBESG)
echo ""
echo "3️⃣  Downloading STEPBible Lexicons..."
if [ ! -d "STEPBible-Data" ]; then
  git clone --depth 1 https://github.com/STEPBible/STEPBible-Data.git
  echo "✅ STEPBible Data downloaded"
else
  echo "ℹ️  STEPBible Data already present"
fi

# 4. Download MorphGNT (alternative morphology data)
echo ""
echo "4️⃣  Downloading MorphGNT (morphological lexicon)..."
if [ ! -d "morphgnt" ]; then
  git clone --depth 1 https://github.com/morphgnt/morphgnt.git
  echo "✅ MorphGNT downloaded"
else
  echo "ℹ️  MorphGNT already present"
fi

cd "$PROJECT_ROOT"

echo ""
echo "✅ All data sources downloaded successfully!"
echo ""
echo "Data location: $SOURCES_DIR"
echo ""
echo "Next steps:"
echo "  npm run parse-opengnt       # Process Greek text"
echo "  npm run parse-strongs       # Process lexicon"
echo "  npm run parse-stepbible     # Process definitions"
echo "  npm run build-concordance   # Build word index"
echo "  npm run split-chapters      # Organize by chapter"
echo ""
echo "Or run: npm run build (full pipeline)"
