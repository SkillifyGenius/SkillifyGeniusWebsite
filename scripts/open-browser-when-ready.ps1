param(
    [switch]$ProbeOnly,
    [int]$Attempts = 60
)

$url = 'http://localhost:3000/'
$probeUrl = 'http://127.0.0.1:3000/'

for ($attempt = 0; $attempt -lt $Attempts; $attempt++) {
    try {
        $response = Invoke-WebRequest -Uri $probeUrl -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200 -and $response.Content -match '<title>[^<]*Skillify Genius') {
            if (-not $ProbeOnly) {
                Start-Process -FilePath $url
            }
            exit 0
        }
    } catch {
        # The development server may still be starting or compiling the page.
    }

    if (-not $ProbeOnly) {
        Start-Sleep -Milliseconds 750
    }
}

exit 1
