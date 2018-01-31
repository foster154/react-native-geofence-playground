const API_URL = 'http://vpn.kidcheck.com/api/MobileClientPosition'

export async function apiSendPosition(Lat, Lon, InFence) {
  fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Lat, Lon, InFence })
  })
}
