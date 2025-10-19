const API_KEY = "10782|YMuI0eDcvypJi5EEYbctFPbZrjzSqjEJTCXPUVnv";  // Replace with tomer key
const API_ENDPOINT = "https://www.zylalabs.com/api/7709/instagram+reel+downloader+api/12502/download+all+content";

async function fetchReelData(url) {
  const fullUrl = `${API_ENDPOINT}?url=${encodeURIComponent(url)}`;
  const response = await fetch(fullUrl, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });
  if (!response.ok) {
    throw new Error("API request failed: " + response.status);
  }
  const data = await response.json();
  return data;
}

async function downloadReel() {
  const reelURL = document.getElementById("reelURL").value.trim();
  const statusDiv = document.getElementById("status");

  if (!reelURL) {
    statusDiv.innerText = "❗ Please enter a Reel URL.";
    return;
  }

  statusDiv.innerText = "⏳ Fetching video...";

  try {
    const data = await fetchReelData(reelURL);

    // Assuming response structure: data.media is array
    if (data.media && data.media.length > 0 && data.media[0].download_url) {
      const a = document.createElement("a");
      a.href = data.media[0].download_url;
      a.download = "instagram-reel.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      statusDiv.innerText = "✅ Video download started!";
    } else {
      statusDiv.innerText = "❌ Could not get video. Response: " + JSON.stringify(data);
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching video: " + error.message;
  }
}

async function downloadThumbnail() {
  const reelURL = document.getElementById("reelURL").value.trim();
  const statusDiv = document.getElementById("status");
  const previewDiv = document.getElementById("thumbnailPreview");

  if (!reelURL) {
    statusDiv.innerText = "❗ Please enter a Reel URL.";
    return;
  }

  statusDiv.innerText = "⏳ Fetching thumbnail...";

  try {
    const data = await fetchReelData(reelURL);

    if (data.media && data.media.length > 0 && data.media[0].thumbnail) {
      const img = document.createElement("img");
      img.src = data.media[0].thumbnail;
      img.alt = "Reel Thumbnail";

      previewDiv.innerHTML = "";
      previewDiv.appendChild(img);

      const a = document.createElement("a");
      a.href = data.media[0].thumbnail;
      a.download = "reel-thumbnail.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      statusDiv.innerText = "✅ Thumbnail download started!";
    } else {
      statusDiv.innerText = "❌ Could not fetch thumbnail. Response: " + JSON.stringify(data);
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching thumbnail: " + error.message;
  }
}
