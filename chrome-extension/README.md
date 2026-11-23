# IP Bulucu Chrome extension

Version 1.0.1 displays your public IP, approximate location and ISP. Missing data stays unavailable. It does not measure VPN safety, CGNAT, speed or security scores.

[Install version 1.0.1 from the Chrome Web Store](https://chromewebstore.google.com/detail/nifmmckmhnfjmpjfakhkifbeegdnanpb). In desktop Chrome, select **Add to Chrome**, open the Extensions menu and pin IP Bulucu. Select its toolbar icon to run a lookup. The link in the popup opens the website for further checks.

[English setup guide](https://ipbulucu.org/en/chrome-extension/) · [Türkçe kurulum rehberi](https://ipbulucu.org/chrome-eklentisi/)

## Developer installation

Download and verify the ZIP against SHA256SUMS, extract it, then use Chrome's Extensions page in developer mode to load the extracted folder. Only the `https://ipbulucu.org/*` host permission is required. No browsing history or page-content permission is requested.

## Usage and privacy

The popup sends an IP API request when opened, labelled `chrome-extension` and `user`. Those declarations are aggregate usage categories, not verified unique people. See [privacy information](https://ipbulucu.org/gizlilik-politikasi/).
