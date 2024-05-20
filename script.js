    let workStartTime = new Date();
    let workEndTime = 0;
    let breakTime = 0;
    let workInterval;
    let breakInterval;
    let elapsedTime = 0;
    let remainingBreakTime = 0;

    function startWork() {
      clearInterval(breakInterval);
      document.getElementById('timerDisplay').innerText = "Working...";
      workInterval = setInterval(updateWorkTime, 1000); // Update every second
      document.body.style.backgroundColor = 'lightcoral'; // Change background to redish color
    }

    function pauseWork() {
      clearInterval(workInterval);
      clearInterval(breakInterval);
      document.body.style.backgroundColor = ''; // Clear background color
      document.getElementById('timerDisplay').innerText = `Work paused`;
    }

    function startBreak() {
      clearInterval(workInterval);
      document.getElementById('timerDisplay').innerText = `Break time...`;
      document.body.style.backgroundColor = 'lightblue'; // Change background to light blue color
      breakInterval = setInterval(updateBreakTime, 1000);
    }

    function updateWorkTime() {
      elapsedTime += 1;
      document.getElementById('workTimeDisplay').innerText = `Work time: ${formatTime(elapsedTime)}`;
      if (elapsedTime % 3 === 0) { // Update break time earned every 3 seconds
        breakTime += 1;
        remainingBreakTime += 1;
        document.getElementById('breakTimeDisplay').innerText = `Break time earned: ${formatTime(breakTime)}`;
        document.getElementById('breakTimeBudgetDisplay').innerText = `Break time left: ${formatTime(remainingBreakTime)}`;
      }
    }

    function updateBreakTime() {
      remainingBreakTime -= 1;
      if(remainingBreakTime<=0)
      {
        document.getElementById('timerDisplay').innerText = `Break time... Negative`;
      }
      else
      {
        document.getElementById('timerDisplay').innerText = `Break time...`;
      }
      document.getElementById('breakTimeBudgetDisplay').innerText = `Break time left: ${formatTime(remainingBreakTime)}`;
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(Math.abs(totalSeconds) / 3600);
        const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
        const seconds = Math.abs(totalSeconds) % 60;
        const sign = totalSeconds < 0 ? '-' : ''; // Add sign for negative times
        return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function showBreakCorrectionSlider() {
      const breakCorrectionContainer = document.getElementById('breakCorrectionContainer');
      if (breakCorrectionContainer.style.display === 'block') {
        breakCorrectionContainer.style.display = 'none';
      } else {
        breakCorrectionContainer.style.display = 'block';
      }
    }

    function applyBreakCorrection() {
      const correctionSeconds = parseInt(document.getElementById('breakCorrectionSlider').value);
      breakTime = Math.max(breakTime + correctionSeconds, 0);
      remainingBreakTime = remainingBreakTime + correctionSeconds;
      document.getElementById('breakTimeDisplay').innerText = `Break time earned total: ${formatTime(breakTime)}`;
      document.getElementById('breakTimeBudgetDisplay').innerText = `Break time left: ${formatTime(remainingBreakTime)}`;
      document.getElementById('breakCorrectionValue').innerText = correctionSeconds;
      document.getElementById('breakCorrectionContainer').style.display = 'none'; // Hide the correction slider after applying correction
    }

    function showWorkCorrectionSlider() {
      const workCorrectionContainer = document.getElementById('workCorrectionContainer');
      if (workCorrectionContainer.style.display === 'block') {
        workCorrectionContainer.style.display = 'none';
      } else {
        workCorrectionContainer.style.display = 'block';
      }
    }

    function applyWorkCorrection() {
      const correctionSeconds = parseInt(document.getElementById('workCorrectionSlider').value);
      elapsedTime = Math.max(elapsedTime + correctionSeconds, 0);
      breakTime = Math.floor(Math.max(breakTime + (correctionSeconds/3), 0));
      remainingBreakTime = Math.floor(remainingBreakTime + (correctionSeconds/3));
      document.getElementById('workTimeDisplay').innerText = `Work time: ${formatTime(elapsedTime)}`;
        document.getElementById('breakTimeDisplay').innerText = `Break time earned: ${formatTime(breakTime)}`;
        document.getElementById('breakTimeBudgetDisplay').innerText = `Break time left: ${formatTime(remainingBreakTime)}`;      
      document.getElementById('workCorrectionValue').innerText = correctionSeconds;
      document.getElementById('workCorrectionContainer').style.display = 'none'; // Hide the correction slider after applying correction
    }

    function updateBreakCorrectionValue() {
      const correctionSeconds = parseInt(document.getElementById('breakCorrectionSlider').value);
      document.getElementById('breakCorrectionValue').innerText = formatTime(correctionSeconds);
    }

    function updateWorkCorrectionValue() {
      const correctionSeconds = parseInt(document.getElementById('workCorrectionSlider').value);
      document.getElementById('workCorrectionValue').innerText = formatTime(correctionSeconds);
      document.getElementById('workCorrectionChange').innerText = `Break time change: ${formatTime(Math.floor(correctionSeconds/3))}`;
    }