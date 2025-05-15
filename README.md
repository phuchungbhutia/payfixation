# Pay Fixation Calculator (7th CPC)

A simple, browser-based tool to calculate the **Date of Next Increment (DNI)** and **New Basic Pay** after a promotion using Pay Fixation rules (Govt. of India, 2018).

---

## 🔧 Features

* Choose Fixation Option: **DoP** or **DNI**
* Enter: Promotion Date, Old Increment Date, Current Pay Level, Promoted Level, and Basic Pay
* Logic applies 1 increment in current level, then selects next higher basic in promoted level
* Built with HTML, inline CSS, and vanilla JS — **no setup needed**

---

## 🚀 How to Use

1. Download or clone this repo:
   ```bash
   git clone https://github.com/phuchungbhutia/payfixation.git
   cd payfixation
   ```
2. Open `index.html` in your browser
3. Fill in:
   * **Promotion Date**
   * **Fixation Option** (DoP or DNI)
   * **Old Increment Date** (e.g., 01/07/2021)
   * **Current Pay Level** and **Promoted Level** (Level 6 & 7 supported)
   * **Current Basic Pay** (e.g., ₹42300)
4. The tool shows:
   * ✅ Next Increment Date
   * ✅ New Basic Pay after promotion

---

## 🧠 Pay Fixation Logic (Simplified)

* **Step 1:** Add 1 increment in current level (find next cell)
* **Step 2:** Go to promoted level and pick the **next higher pay**
* **Step 3:** Set Date of Next Increment based on fixation option:
  * `DoP`: 1 year from promotion date
  * `DNI`: 1 year from last increment date

---

## 📊 Sample Pay Matrix Used

Level 6:

```
₹35400, ₹36500, ₹37600, ₹38700, ₹39900, ₹41100, ₹42300, ₹43600, ₹44900, ₹46200
```

Level 7:

```
₹44900, ₹46200, ₹47600, ₹49000, ₹50500, ₹52000, ₹53600, ₹55200, ₹56900, ₹58600
```

---

## 📁 File Structure

```
pay-fixation-calculator/
├── index.html      # Main interactive calculator
├── README.md       # This documentation
└── .gitignore      # Currently empty (future use)
```

---

## 🔄 GitHub Workflow

To update and push your changes:

```bash
git add .
git commit -m "Your commit message here"
git push origin main
```

If deploying on  **GitHub Pages** :

```bash
git checkout -b gh-pages
# Push once to create branch

git push origin gh-pages
```

Then visit:

```
https://phuchungbhutia.github.io/payfixation/
```

---

## 🧩 To Extend:

* Replace the sample matrix with full Pay Matrix from 7th CPC
* Add PDF/Excel import
* Add saving/exporting feature

---

## 📬 Contributions

Feel free to fork and contribute improvements. This is a basic starter to build on.

---

MIT License
