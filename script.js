const API_KEY = "10782|YMuI0eDcvypJi5EEYbctFPbZrjzSqjEJTCXPUVnv"; // Change
const API_ENDPOINT = "https://www.zylalabs.com/api/7709/instagram+reel+downloader+api/12502/download+all+content"; //Change

// Fetch data from ZylaLabs API
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
  console.log("🔍 Full API Response:", data);  // For debugging
  return data;
}

// Download Reel Video
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

    if (data.media && data.media.length > 0) {
      const videoItem = data.media.find(item => item.type === "video");

      if (videoItem && videoItem.url) {
        const a = document.createElement("a");
        a.href = videoItem.url;
        a.download = "instagram-reel.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        statusDiv.innerText = "✅ Video download started!";
      } else {
        statusDiv.innerText = "❌ Video URL not found in API response.";
      }
    } else {
      statusDiv.innerText = "❌ Media not found in response.";
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching video: " + error.message;
  }
}

// Download Thumbnail Image
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

    if (data.media && data.media.length > 0) {
      const mediaItem = data.media[0];

      if (mediaItem.thumbnail) {
        const img = document.createElement("img");
        img.src = mediaItem.thumbnail;
        img.alt = "Reel Thumbnail";
        img.style.maxWidth = "100%";
        previewDiv.innerHTML = "";
        previewDiv.appendChild(img);

        const a = document.createElement("a");
        a.href = mediaItem.thumbnail;
        a.download = "reel-thumbnail.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        statusDiv.innerText = "✅ Thumbnail download started!";
      } else {
        statusDiv.innerText = "❌ Thumbnail not found in API response.";
      }
    } else {
      statusDiv.innerText = "❌ Media not found in response.";
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching thumbnail: " + error.message;
  }
}
