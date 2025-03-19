find . -type f -exec perl -i -pe 's{\Q/** @jsx jsx */}{/** @jsxRuntime classic */\n/** @jsx jsx */}g' {} +
