import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const checks = {
    srcFontExists: false,
    publicFontExists: false,
    srcFontSize: 0,
    publicFontSize: 0,
    error: null as string | null,
  };

  try {
    // Check src/fonts location
    const srcFontPath = path.join(process.cwd(), 'src', 'fonts', 'PCISansBold.otf');
    if (fs.existsSync(srcFontPath)) {
      checks.srcFontExists = true;
      checks.srcFontSize = fs.statSync(srcFontPath).size;
    }

    // Check public/fonts location
    const publicFontPath = path.join(process.cwd(), 'public', 'fonts', 'PCISansBold.otf');
    if (fs.existsSync(publicFontPath)) {
      checks.publicFontExists = true;
      checks.publicFontSize = fs.statSync(publicFontPath).size;
    }
  } catch (error) {
    checks.error = error instanceof Error ? error.message : 'Unknown error';
  }

  return NextResponse.json({
    ...checks,
    message: checks.srcFontExists 
      ? 'Font file found in src/fonts' 
      : 'Font file NOT found in src/fonts',
    timestamp: new Date().toISOString(),
  });
}

