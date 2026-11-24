# IP Bulucu Chrome extension

The popup displays your public IP address and the approximate location and internet provider returned by IP Bulucu. Version 1.0.2 adds an IP copy button and Turkish and English messages. Copying happens on your device.

[Install the published extension from the Chrome Web Store](https://chromewebstore.google.com/detail/nifmmckmhnfjmpjfakhkifbeegdnanpb). In desktop Chrome, select **Add to Chrome**, open the Extensions menu and pin IP Bulucu. Select its toolbar icon to run a lookup. The link in the popup opens the website for further checks.

[English setup guide](https://ipbulucu.org/en/chrome-extension/) · [Türkçe kurulum rehberi](https://ipbulucu.org/chrome-eklentisi/)

## Developer installation

Download and verify the ZIP against SHA256SUMS, extract it, then use Chrome's Extensions page in developer mode to load the extracted folder. Only the `https://ipbulucu.org/*` host permission is required. No browsing history or page-content permission is requested.

## Usage and privacy

The popup sends an IP API request when opened, labelled `chrome-extension` and `user`. Those declarations are aggregate usage categories, not verified unique people. See [privacy information](https://ipbulucu.org/gizlilik-politikasi/).
