# **StatusChecker**
## StatusChecker checks the statuses of TCP ports and systemd services and displays information in a simple, user-friendly dashboard.

## How it works
- Services, TCP ports and systemd services are listed in a PHP script (status/index.php)
- On page load, TCP requests are sent to the ports and checks if it's online. If successful, it's "Online". If not, it's "Offline".
- Systemd services are checked with the "systemctl is-active" command with the service name on the server and returns "active" or "inactive". The PHP script must have permissions to run systemctl.
- The PHP script outputs responses and service information in JSON format, like an API.
- The JavaScript file (script.js) fetches the data and displays it in human-readable cards.

## Screenshot
<img width="1880" height="895" alt="dashboard" src="https://github.com/user-attachments/assets/c33fea2f-23a0-4f3d-8f4b-80ec0b22f42c" />

## Files
- index.html: Main page to view the statuses.
- script.js: Fetches JSON data and creates status cards and filtering.
- styles.css: Styles the cards and page.
- status/index.php: PHP script that checks TCP ports and systemd service statuses and outputs as JSON format.

## Installation
- Download the repository files to a PHP web server.
- Replace the default services and ports in status/index.php with your own.
- Open index.html in a browser to view the dashboard.
