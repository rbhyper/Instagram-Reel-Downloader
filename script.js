async function fetchReelData(url) {
  // Replace with your actual API endpoint
  const apiURL = `https://your-api-url.com/api/download?url=${encodeURIComponent(url)}`;

  const response = await fetch(apiURL);
  if (!response.ok) throw new Error("Failed to fetch data");

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

    if (data.success && data.download_url) {
      const a = document.createElement("a");
      a.href = data.download_url;
      a.download = "instagram-reel.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      statusDiv.innerText = "✅ Video download started!";
    } else {
      statusDiv.innerText = "❌ Could not get video.";
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching video.";
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

    if (data.success && data.thumbnail_url) {
      const img = document.createElement("img");
      img.src = data.thumbnail_url;
      img.alt = "Reel Thumbnail";

      // Clear previous thumbnail
      previewDiv.innerHTML = "";
      previewDiv.appendChild(img);

      // Download
      const a = document.createElement("a");
      a.href = data.thumbnail_url;
      a.download = "reel-thumbnail.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      statusDiv.innerText = "✅ Thumbnail download started!";
    } else {
      statusDiv.innerText = "❌ Could not fetch thumbnail.";
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Error fetching thumbnail.";
  }
}
