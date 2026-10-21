# Day1 Commission Calculator

The Commission Calculator, packaged to run on GitHub Pages. Same layout and rules as the version in Claude: New rules (FP bonus), Old rules (pax commission), Bank Transfers, Reviews, Insurance sold, Uploads & adjustments, Team, and Rates & rules.

- **Reviews**: review bonus by person, average rating, reviews under 4 stars and whose bonus they zeroed, and every review in the file with the person it was credited to.
- **Insurance sold**: policies and insurance bonus by person, share of the total, and (when the export has one row per policy) every policy with booking, customer, product and premium. A one-row-per-person file with a policy count still works.

It is one file, `index.html`. No server, no database, no sign-in.

## Where the data lives

Everything you enter is saved **in your browser, on that device**. It is never stored on GitHub or sent anywhere.

- Another computer or browser starts empty until you restore a backup there.
- Clearing browser data, or using a private window, loses it. Click **Download backup** after each month closes and keep the file somewhere safe, such as Drive.
- The repository can be public without exposing anyone's name or pay, because the page itself holds none.

## Put it on GitHub Pages (about 5 minutes)

1. Sign in at github.com and click **New repository**. Name it, for example, `commission-calculator`.
2. Pick **Private** if your plan supports Pages on private repos (paid plans do), otherwise **Public**.
3. Click **Create repository**, then **uploading an existing file**. Drag in `index.html` and this `README.md` only. **Do not upload the backup file**: it contains staff names and pay settings. Click **Commit changes**.
4. Go to **Settings > Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, and click **Save**.
5. After a minute, refresh. Your address shows at the top, like `https://your-username.github.io/commission-calculator/`. Bookmark it.

To update the tool later, upload a new `index.html` over the old one. Saved data is unaffected.

## First run

1. Open your GitHub Pages address.
2. Click **Restore backup** and choose `cruisehub-commission-backup-2026-10-21.json`. This loads everything that was in the Claude version on 21 October: the team and who is on which rules, transport amounts, every rate and tier, and the October 2026 pay period (including the names you had already marked as not a person).
3. Set the October USD to EGP rate in the top bar (still September's 52.32), then upload the exports on **Uploads & adjustments**.

## Each month

1. **New month** starts the next pay period.
2. Upload the exports. If you upload one workbook with several tabs, the matching tab is picked for you; confirm the columns and save.
3. Link or dismiss any names that match nobody.
4. Check the results tabs, then **Close month**.
5. **Download backup**.

## Demo mode (for walkthroughs)

Add `?demo` to the end of the address, for example `https://your-username.github.io/commission-calculator/?demo`.

It opens a fictional team of 13 with September 2026 already closed and October 2026 ready to review. Demo data is stored separately from your real data, so nothing you click in the demo touches it. **Reset demo** puts the figures back to the start. The people and figures are invented, so the demo is safe to show anyone.

Where each rule shows up in October:

| Person | What it demonstrates |
|---|---|
| Ethan Cole | Old rules at the top: 146 pax at $8, High Performer ×1.15 |
| Grace Holden, Liam Carter, Sophie Lane | The middle levels: Qualified, Limited, Participation Cap |
| Sophie Lane | Attendance trial: 88% attendance, shown as what it would cost, not deducted |
| Lucas Grant | Below 50 pax pays no commission; a 500 EGP advance repayment on Bank Transfers |
| Ava Sinclair | Leaver mid-month: transport pro-rated to 11 days |
| Nadia Farouk | New rules at the top: 52 FP bookings, tier 4, including a 9-cabin group counted in its sailing month |
| Karim Mansour | Missed CSAT drops a tier; both milestones hit ($150 + $250); a 3-star review zeroes his review bonus |
| Salma Youssef | New joiner: attendance not applied in her first 90 days |
| Omar Shafik | An unreported cancellation sets the month's FP bonus to 0; a pending and a cancelled booking excluded |
| Hannah Ward | Manager on fixed 0 commission, paid a 15,000 award through Bonus Incentives |
| J. Patel | A name in the report that matches nobody, shown on top for linking or dismissing |
| Support Team | A review credited to nobody, flagged on the Reviews tab |

A good order to present it: New rules tab (Nadia, Karim, Omar), Old rules tab (Ethan down to Lucas), Reviews (Karim's 3-star review zeroing his bonus), Insurance sold (every policy listed), Bank Transfers (final amounts and the CSV), then September in the period picker to show a closed, frozen month.

## Base salary tool (`salary.html`)

A second tool on the same site, for monthly base salaries. Switch between the two with the **Commission | Base salary** buttons in the header. Its data and backups are separate from the commission tool.

- **Payroll**: one row per employee, laid out like the salary sheet. Type days deducted, any other deduction in EGP (for example a payout deduction) with the reason, public holidays worked, extra days, bonus, loan, payment method, batch, status, payment date and notes for Marcus. Amounts and Net Total are worked out for you.
- **Rules**: day rate = basic ÷ 30. Each public holiday worked adds 2 extra days' pay (3 days in total for that day). Each other extra day adds 1 day's pay. Net = basic − day deductions − other deductions + holiday pay + extra pay + bonus − loan. Deductions and loans each have a reason column; a row with an amount and no reason is flagged. All adjustable on Settings.
- **Cash & transfers**: the total cash to transfer to Amira to hand out, with a printable list and a signature column, plus totals by payment method and by batch.
- **Employees**: English reference name, Arabic bank name, basic (net), default method and batch. **Import from salary sheet** reads an existing salary workbook and adds or updates everyone in one go.
- **Summary**: totals, what was added and taken off, how salaries are paid, status, and month by month.
- Set a status and payment date for a whole batch at once; close a month to freeze it; download Excel in the sheet's column order.

Demo: `salary.html?demo` (14 fictional employees, the same people as the commission demo, September closed and October open).

## Good to know

- Uploads and the column reader need an internet connection, because the spreadsheet library and fonts load from public CDNs.
- Browsers allow roughly 5 MB of saved data per site. That is many months of exports, but if it ever fills up the page will say so: download a backup, then remove older months' uploads.
- The Claude version still exists and still works. The two do not sync: pick one as the master going forward.
