// slider splitview
let tmpl = document.createElement("template");
tmpl.innerHTML = `
  <style>
    :host {
      display: block;
    }
    :host([hidden]) { display: none }
    .split {
      position: relative;
      height: 100%;
      display: grid;
      align-items: center;
      --split: 100;
    }
    .top,
    .bottom {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .bottom {
      background-color: red;
    }
    .top {
      z-index: 2;
      right: calc(8px + (((100% - 16px) / 100) * (100 - var(--split))));
      overflow: hidden;
      border-right: 1px solid white;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      z-index: 3;
      background-color: transparent;
      -webkit-appearance: none;
    }
    input[type="range"]:focus {
      outline: var(--outline, -webkit-focus-ring-color auto 1px);
    }
  </style>
  <div class="split" id="split" role="img" aria-label="Comparison of two images">
    <div
      class="bottom"
      id="bottom"
      aria-label="First image to compare"
    >
      <slot name="bottom"></slot>
    </div>
    <div
      class="top"
      id="top"
      aria-label="Second image to compare"
    >
      <slot name="top"></slot>  
    </div>
    <label id="label" for="slider">Slide left and right to compare images</label>
    <input
      type="range"
      role="slider"
      min=0
      max=100
      value=0
      name="slider"
      id="slider"
      aria-labelledby="label"
      aria-valuemin=0
      aria-valuemax=100
    />
    </div>
`;
class SplitView extends HTMLElement {
  constructor() {
    super();
    let t = this.attachShadow({ mode: "open" });
    t.appendChild(tmpl.content.cloneNode(!0));
  }
  connectedCallback() {
    const t = this.shadowRoot.getElementById("split"),
      e = this.shadowRoot.getElementById("slider"),
      l = this.shadowRoot.getElementById("label"),
      s = this.shadowRoot.getElementById("top"),
      i = this.getAttribute("start") || 50,
      a = this.getAttribute("split-view-label") || "Comparison of two images",
      r =
        this.getAttribute("slider-label") ||
        "Press left and right to compare images",
      n = this.getAttribute("mode") || "normal";
    e.addEventListener("input", (d) => {
      const o = +d.target.value;
      t.style.setProperty("--split", o), e.setAttribute("aria-valuenow", o);
    }),
      t.style.setProperty("--split", i),
      e.setAttribute("aria-valuenow", i),
      (e.value = i),
      t.setAttribute("aria-label", a),
      (l.innerText = r),
      (s.style.mixBlendMode = n);
  }
}
window.customElements.define("split-view", SplitView);

// form repeater
$(document).ready(function () {
  $('.repeater').repeater({
    initEmpty: false,
    defaultValues: {
      'text-input': ''
    },
    show: function () {
      $(this).slideDown();
    },
    hide: function (deleteElement) {
      $(this).slideUp(deleteElement);
      setTimeout(() => {
        generateCV();
      }, 500);
    },
    isFirstItemUndeletable: true
  })
})

function reloadJs(src) {
  src = $('script[src$="' + src + '"]').attr("src");
  $('script[src$="' + src + '"]').remove();
  $('<script/>').attr('src', src).appendTo('head');
}

// choose template
var $result = $('#result');
$('#change-template1').click(function () {
  $result.load('../../views/partials/template1.ejs');
  reloadJs('assets/js/generator.js');
});
$('#change-template2').click(function () {
  $result.load('../../views/partials/template2.ejs');
});
$('#change-template3').click(function () {
  $result.load('../../views/partials/template3.ejs');
});


// Generate the PDF

let cv = document.querySelector('#div-to-print-pdf');
let pageWidth = cv.clientWidth; // div's width
let pageHeight = cv.clientHeight; // div's height

// Unit check (adjust based on your default unit)
let unit = 'px'; // Change to 'mm' or 'cm' if needed

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#btn-one').addEventListener('click', function () {
    html2canvas(document.querySelector('#div-to-print-pdf')).then((canvas) => {
      function getDivHeight() {
        // add padding if needed
        return cv.scrollHeight + parseInt(getComputedStyle(cv).paddingTop) + parseInt(getComputedStyle(cv).paddingBottom);
      }
      let pageHeight = getDivHeight();
      let base64image = canvas.toDataURL('image/jpeg');

      // Check for overflow
      if (cv.scrollHeight > cv.clientHeight || cv.scrollWidth > cv.clientWidth) {
        console.error("Div content overflows. Address overflow or adjust PDF size.");
        return; // Prevent PDF creation if overflow exists
      }

      let pdf = new jsPDF('p', unit, [pageWidth, pageHeight]); // Set units consistently
      pdf.addImage(base64image, 'JPEG', 0, 0); // No margins for full content (adjust margins if needed)
      pdf.save('pb-cv.pdf');
      console.log("Calculated page height:", pageHeight);
    });
  });
});

console.log(pageWidth, pageHeight);

// Generator form steps

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Klaar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Volgende";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("cv-form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("input-steps");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}