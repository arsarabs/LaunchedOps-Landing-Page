# Download Google Fonts for self-hosting
# Run: powershell -ExecutionPolicy Bypass -File download-fonts.ps1

$fontsDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Plus Jakarta Sans
$pjsWeights = @{
    "400" = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf"
    "500" = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NSg.ttf"
    "600" = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNSg.ttf"
    "700" = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNSg.ttf"
    "800" = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNSg.ttf"
}

# DM Sans
$dmsWeights = @{
    "400" = "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf"
    "500" = "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf"
    "700" = "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTg.ttf"
}

Write-Host "Downloading Plus Jakarta Sans..."
foreach ($entry in $pjsWeights.GetEnumerator()) {
    $outFile = Join-Path $fontsDir "plus-jakarta-sans-$($entry.Key).ttf"
    Write-Host "  Weight $($entry.Key) -> $outFile"
    Invoke-WebRequest -Uri $entry.Value -OutFile $outFile
}

Write-Host "Downloading DM Sans..."
foreach ($entry in $dmsWeights.GetEnumerator()) {
    $outFile = Join-Path $fontsDir "dm-sans-$($entry.Key).ttf"
    Write-Host "  Weight $($entry.Key) -> $outFile"
    Invoke-WebRequest -Uri $entry.Value -OutFile $outFile
}

Write-Host "Done! Font files saved to: $fontsDir"
Write-Host "Note: For optimal performance, convert TTF to WOFF2 using https://cloudconvert.com/ttf-to-woff2"
