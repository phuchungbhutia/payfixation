
# Pay Fixation Calculator (Sikkim Govt Revised Pay 2018)

A browser-based tool to calculate the **new basic pay** and **date of next increment** after a promotion using the official pay matrix under Sikkim Government's Revised Pay Rules 2018.

---

## ✅ Features

- Automatically loads pay matrix from a local CSV file
- No upload required — just deploy with the CSV file included
- Allows user to:
  - Select promotion date
  - Choose fixation option: DoP (from promotion) or DNI (from next increment)
  - Select current pay level and cell
  - Select promoted pay level
- Instantly calculates:
  - **New Basic Pay** (with increment and promotion)
  - **Date of Next Increment**

---

## 🚀 How to Use

1. **Clone or download this repo**:

   ```bash
   git clone https://github.com/phuchungbhutia/payfixation.git
   cd payfixation
   ```
2. Make sure the following files are in the root folder:

   - `index.html`
   - `pay_matrix_sikkim.csv`
3. Run a local server (e.g., Python):

   ```bash
   python3 -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```
4. Or deploy to **GitHub Pages**:

   - Push to GitHub repo
   - Enable Pages from the repo Settings → Pages → Source: `main` or `gh-pages`
   - Visit: `https://phuchungbhutia.github.io/payfixation/`

---

## 📄 Pay Matrix File Format (CSV)

```
Level,1,2,3,4,5,...
6,35400,36500,37600,38700,39900,...
7,44900,46200,47600,49000,50500,...
```

- Each row represents a **pay level**
- Columns after `Level` represent the pay values (steps/cells)
- Ensure the CSV filename is exactly: `pay_matrix_sikkim.csv`

---

## 📁 File Structure

```
payfixation/
├── index.html               # Calculator UI + logic
├── pay_matrix_sikkim.csv    # Sikkim Pay Matrix CSV (auto-loaded)
├── README.md                # Instructions and logic
└── .gitignore               # Git exclusions
```

---

## 🧠 Logic Summary

### 🔹 DoP (Fixation from Promotion Date)

- 1 increment in current level (next cell)
- Fix pay in promoted level: next equal or higher pay
- DNI = 1 year from promotion date

### 🔹 DNI (Fixation from Next Increment)

- Fix pay at same value in promoted level (no increment) on promotion
- On DNI:
  - 1 annual increment + 1 promotion increment in current level
  - Then fix at next higher pay in promoted level
- DNI = 1 year from original increment date

---

## 🔄 GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/phuchungbhutia/payfixation.git
git push -u origin main
```

### To deploy:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Then visit:

```
https://phuchungbhutia.github.io/payfixation/
```

---

## 📬 License

MIT — Free to use, modify, and share with attribution.
