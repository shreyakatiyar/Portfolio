import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const pdfPath = join(process.cwd(), 'public', 'ShReYa_KaTiYaR (4).pdf')
  const pdf = readFileSync(pdfPath)

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': 'inline; filename="Shreya_Katiyar_Resume.pdf"',
      'Content-Length':      pdf.length.toString(),
      'Cache-Control':       'public, max-age=3600',
    },
  })
}
