"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Inputs = {
  reps: number;
  baseSalary: number;
  variableComp: number;
  benefits: number;
  toolsPerRep: number;
  recruitingPerHire: number;
  annualTurnover: number;
  managerSalary: number;
  managerAllocation: number;
  managementHoursPerRep: number;
  rampMonths: number;
  rampProductivity: number;
  workingDays: number;
  dialsPerRep: number;
  connectRate: number;
  qualifiedRate: number;
  kanaryMonthly: number;
  kanaryConversations: number;
  opportunityRate: number;
  closeRate: number;
  averageContract: number;
  grossMargin: number;
};

type FieldProps = { id: string; label: string; value: number; onChange: (value: number) => void };

const defaults: Inputs = {
  reps: 2,
  baseSalary: 65000,
  variableComp: 15000,
  benefits: 25,
  toolsPerRep: 1200,
  recruitingPerHire: 12000,
  annualTurnover: 35,
  managerSalary: 145000,
  managerAllocation: 35,
  managementHoursPerRep: 12,
  rampMonths: 3,
  rampProductivity: 50,
  workingDays: 20,
  dialsPerRep: 60,
  connectRate: 5,
  qualifiedRate: 18,
  kanaryMonthly: 7500,
  kanaryConversations: 12,
  opportunityRate: 35,
  closeRate: 20,
  averageContract: 25000,
  grossMargin: 80,
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function clamp(value: number, min = 0, max = Number.POSITIVE_INFINITY) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : 0));
}

function CurrencyInput({ id, label, value, onChange, step = 500, note }: FieldProps & { step?: number; note?: string }) {
  return <label className="roi-field" htmlFor={id}><span>{label}</span><span className="roi-input-shell"><b aria-hidden="true">$</b><input id={id} type="number" min="0" step={step} value={value} onChange={(event) => onChange(clamp(Number(event.target.value)))} /></span>{note && <small>{note}</small>}</label>;
}

function PercentInput({ id, label, value, onChange, note }: FieldProps & { note?: string }) {
  return <label className="roi-field" htmlFor={id}><span>{label}</span><span className="roi-input-shell roi-input-suffix"><input id={id} type="number" min="0" max="100" step="1" value={value} onChange={(event) => onChange(clamp(Number(event.target.value), 0, 100))} /><b aria-hidden="true">%</b></span>{note && <small>{note}</small>}</label>;
}

function NumberInput({ id, label, value, onChange, min = 0, step = 1, note }: FieldProps & { min?: number; step?: number; note?: string }) {
  return <label className="roi-field" htmlFor={id}><span>{label}</span><span className="roi-input-shell"><input id={id} type="number" min={min} step={step} value={value} onChange={(event) => onChange(clamp(Number(event.target.value), min))} /></span>{note && <small>{note}</small>}</label>;
}

export function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const update = (key: keyof Inputs) => (value: number) => setInputs((current) => ({ ...current, [key]: value }));

  const result = useMemo(() => {
    const reps = clamp(inputs.reps);
    const repCashComp = clamp(inputs.baseSalary) + clamp(inputs.variableComp);
    const annualCompAndBenefits = reps * repCashComp * (1 + clamp(inputs.benefits, 0, 100) / 100);
    const annualTools = reps * clamp(inputs.toolsPerRep) * 12;
    const annualHiring = reps * clamp(inputs.annualTurnover, 0, 100) / 100 * clamp(inputs.recruitingPerHire);
    const annualManagement = clamp(inputs.managerSalary) * clamp(inputs.managerAllocation, 0, 100) / 100;
    const inHouseMonthly = (annualCompAndBenefits + annualTools + annualHiring + annualManagement) / 12;
    const rampLoss = clamp(inputs.annualTurnover, 0, 100) / 100 * clamp(inputs.rampMonths) / 12 * (1 - clamp(inputs.rampProductivity, 0, 100) / 100);
    const productiveCapacity = reps * clamp(1 - rampLoss, 0, 1);
    const inHouseConversations = productiveCapacity * clamp(inputs.workingDays) * clamp(inputs.dialsPerRep) * clamp(inputs.connectRate, 0, 100) / 100 * clamp(inputs.qualifiedRate, 0, 100) / 100;
    const kanaryConversations = clamp(inputs.kanaryConversations);
    const kanaryMonthly = clamp(inputs.kanaryMonthly);
    const grossProfitPerConversation = clamp(inputs.opportunityRate, 0, 100) / 100 * clamp(inputs.closeRate, 0, 100) / 100 * clamp(inputs.averageContract) * clamp(inputs.grossMargin, 0, 100) / 100;
    const inHouseGrossProfit = inHouseConversations * grossProfitPerConversation;
    const kanaryGrossProfit = kanaryConversations * grossProfitPerConversation;
    const inHouseCostPerConversation = inHouseConversations > 0 ? inHouseMonthly / inHouseConversations : 0;
    const kanaryCostPerConversation = kanaryConversations > 0 ? kanaryMonthly / kanaryConversations : 0;
    return {
      inHouseMonthly,
      kanaryMonthly,
      monthlySavings: inHouseMonthly - kanaryMonthly,
      annualSavings: (inHouseMonthly - kanaryMonthly) * 12,
      inHouseConversations,
      kanaryConversations,
      inHouseCostPerConversation,
      kanaryCostPerConversation,
      inHousePer10k: inHouseMonthly > 0 ? inHouseConversations / inHouseMonthly * 10000 : 0,
      kanaryPer10k: kanaryMonthly > 0 ? kanaryConversations / kanaryMonthly * 10000 : 0,
      inHouseRoi: inHouseMonthly > 0 ? (inHouseGrossProfit - inHouseMonthly) / inHouseMonthly * 100 : 0,
      kanaryRoi: kanaryMonthly > 0 ? (kanaryGrossProfit - kanaryMonthly) / kanaryMonthly * 100 : 0,
      inHouseNet: inHouseGrossProfit - inHouseMonthly,
      kanaryNet: kanaryGrossProfit - kanaryMonthly,
      breakEvenConversations: grossProfitPerConversation > 0 ? kanaryMonthly / grossProfitPerConversation : 0,
      rampMonthsLost: reps * clamp(inputs.annualTurnover, 0, 100) / 100 * clamp(inputs.rampMonths),
      managementHoursSaved: reps * clamp(inputs.managementHoursPerRep),
    };
  }, [inputs]);

  const maxCost = Math.max(result.inHouseMonthly, result.kanaryMonthly, 1);
  const positiveSavings = result.annualSavings >= 0;

  return <>
    <section className="roi-benefits" aria-label="Benefits of fractional outbound">
      {["Expert execution from day one", "No recruiting or ramp curriculum", "No SDR management layer", "KPI ownership + rapid product and market learning"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
    </section>

    <section className="roi-calculator" aria-labelledby="roi-calculator-title">
      <div className="roi-inputs">
        <div className="roi-input-heading"><div><p className="eyebrow">Your assumptions</p><h2 id="roi-calculator-title">Build your real comparison.</h2></div><button type="button" className="roi-reset" onClick={() => setInputs(defaults)}>Reset assumptions</button></div>

        <details open><summary><span>01</span> Team + compensation <i aria-hidden="true">+</i></summary><div className="roi-field-grid">
          <NumberInput id="reps" label="Number of SDRs" min={1} value={inputs.reps} onChange={update("reps")} />
          <CurrencyInput id="baseSalary" label="Base salary per SDR / year" step={1000} value={inputs.baseSalary} onChange={update("baseSalary")} />
          <CurrencyInput id="variableComp" label="Variable comp per SDR / year" step={1000} value={inputs.variableComp} onChange={update("variableComp")} />
          <PercentInput id="benefits" label="Benefits + payroll burden" value={inputs.benefits} onChange={update("benefits")} note="Health, payroll tax, retirement, insurance." />
        </div></details>

        <details><summary><span>02</span> Hidden team costs <i aria-hidden="true">+</i></summary><div className="roi-field-grid">
          <CurrencyInput id="toolsPerRep" label="Tools + data per SDR / month" step={100} value={inputs.toolsPerRep} onChange={update("toolsPerRep")} note="Dialer, data, CRM seats, enrichment, sequencing." />
          <CurrencyInput id="recruitingPerHire" label="Recruiting + onboarding per hire" step={1000} value={inputs.recruitingPerHire} onChange={update("recruitingPerHire")} />
          <PercentInput id="annualTurnover" label="Expected annual SDR turnover" value={inputs.annualTurnover} onChange={update("annualTurnover")} />
          <CurrencyInput id="managerSalary" label="Sales manager annual comp" step={1000} value={inputs.managerSalary} onChange={update("managerSalary")} />
          <PercentInput id="managerAllocation" label="Manager time allocated to SDRs" value={inputs.managerAllocation} onChange={update("managerAllocation")} />
          <NumberInput id="managementHoursPerRep" label="Management hours per SDR / month" value={inputs.managementHoursPerRep} onChange={update("managementHoursPerRep")} />
          <NumberInput id="rampMonths" label="Months to full productivity" value={inputs.rampMonths} onChange={update("rampMonths")} />
          <PercentInput id="rampProductivity" label="Productivity while ramping" value={inputs.rampProductivity} onChange={update("rampProductivity")} />
        </div></details>

        <details><summary><span>03</span> In-house output model <i aria-hidden="true">+</i></summary><div className="roi-field-grid">
          <NumberInput id="workingDays" label="Calling days per month" value={inputs.workingDays} onChange={update("workingDays")} />
          <NumberInput id="dialsPerRep" label="Dials per SDR / day" value={inputs.dialsPerRep} onChange={update("dialsPerRep")} />
          <PercentInput id="connectRate" label="Live connect rate" value={inputs.connectRate} onChange={update("connectRate")} />
          <PercentInput id="qualifiedRate" label="Qualified conversation rate" value={inputs.qualifiedRate} onChange={update("qualifiedRate")} note="Share of live connects that become qualified conversations." />
        </div></details>

        <details open><summary><span>04</span> Kanary + revenue model <i aria-hidden="true">+</i></summary><div className="roi-field-grid">
          <CurrencyInput id="kanaryMonthly" label="Kanary monthly investment" step={500} value={inputs.kanaryMonthly} onChange={update("kanaryMonthly")} note="Illustrative starting point. Replace with your proposed scope." />
          <NumberInput id="kanaryConversations" label="Kanary qualified conversations / month" value={inputs.kanaryConversations} onChange={update("kanaryConversations")} />
          <PercentInput id="opportunityRate" label="Conversation → opportunity rate" value={inputs.opportunityRate} onChange={update("opportunityRate")} />
          <PercentInput id="closeRate" label="Opportunity close rate" value={inputs.closeRate} onChange={update("closeRate")} />
          <CurrencyInput id="averageContract" label="Average contract value" step={1000} value={inputs.averageContract} onChange={update("averageContract")} />
          <PercentInput id="grossMargin" label="Gross margin" value={inputs.grossMargin} onChange={update("grossMargin")} />
        </div></details>
      </div>

      <aside className="roi-results">
        <p className="sr-only" aria-live="polite" aria-atomic="true">Modeled annual cost difference: {money.format(Math.abs(result.annualSavings))}. Kanary cost per qualified conversation: {result.kanaryConversations > 0 ? money.format(result.kanaryCostPerConversation) : "not available"}. Modeled Kanary monthly ROI: {result.kanaryMonthly > 0 ? `${number.format(result.kanaryRoi)} percent` : "not available"}.</p>
        <p className="eyebrow">Your modeled outcome</p>
        <div className="roi-savings"><span>{positiveSavings ? "Potential annual cost savings" : "Annual in-house cost advantage"}</span><strong>{money.format(Math.abs(result.annualSavings))}</strong><small>{positiveSavings ? `${money.format(result.monthlySavings)} less operating cost each month` : `With these assumptions, Kanary costs ${money.format(Math.abs(result.monthlySavings))} more each month`}</small></div>
        <div className="roi-cost-bars" aria-label="Monthly operating cost comparison">
          <div><span><b>In-house SDR team</b><strong>{money.format(result.inHouseMonthly)} / mo</strong></span><i style={{ width: `${result.inHouseMonthly / maxCost * 100}%` }} /></div>
          <div><span><b>Kanary Calling</b><strong>{money.format(result.kanaryMonthly)} / mo</strong></span><i className="kanary-bar" style={{ width: `${result.kanaryMonthly / maxCost * 100}%` }} /></div>
        </div>
        <div className="roi-scorecard">
          <div className="roi-score-head"><span>Efficiency scorecard</span><span>In-house</span><span>Kanary</span></div>
          <div><span>Qualified conversations / mo</span><strong>{number.format(result.inHouseConversations)}</strong><strong>{number.format(result.kanaryConversations)}</strong></div>
          <div><span>Cost / qualified conversation</span><strong>{result.inHouseConversations > 0 ? money.format(result.inHouseCostPerConversation) : "—"}</strong><strong>{result.kanaryConversations > 0 ? money.format(result.kanaryCostPerConversation) : "—"}</strong></div>
          <div><span>Conversations per $10k</span><strong>{result.inHouseMonthly > 0 ? number.format(result.inHousePer10k) : "—"}</strong><strong>{result.kanaryMonthly > 0 ? number.format(result.kanaryPer10k) : "—"}</strong></div>
          <div><span>Modeled monthly ROI</span><strong>{result.inHouseMonthly > 0 ? `${number.format(result.inHouseRoi)}%` : "—"}</strong><strong>{result.kanaryMonthly > 0 ? `${number.format(result.kanaryRoi)}%` : "—"}</strong></div>
          <div><span>Net contribution / mo</span><strong>{money.format(result.inHouseNet)}</strong><strong>{money.format(result.kanaryNet)}</strong></div>
        </div>
        <div className="roi-takeaways">
          <p><span>↗</span><strong>Break-even:</strong>{result.breakEvenConversations > 0 ? `Kanary needs ${number.format(result.breakEvenConversations)} qualified conversations per month to cover its modeled cost.` : "Add revenue conversion assumptions to calculate break-even."}</p>
          <p><span>↗</span><strong>Management avoided:</strong> Your leaders get back roughly {number.format(result.managementHoursSaved)} hours each month.</p>
          <p><span>↗</span><strong>Ramp drag avoided:</strong> Your SDR model absorbs about {number.format(result.rampMonthsLost)} new-hire ramp months each year.</p>
        </div>
        <Link className="button" href="/contact">Pressure-test these numbers <span aria-hidden="true">↗</span></Link>
        <p className="roi-disclaimer">This is an illustrative planning model, not a promise of results. Actual pricing, activity, conversion, timing, and revenue vary by offer and market.</p>
      </aside>
    </section>

    <section className="roi-method">
      <div><p className="eyebrow">What the math includes</p><h2>Salary is only the visible part of the cost.</h2></div>
      <div className="roi-method-list">
        <p><span>01</span><strong>Fully loaded labor</strong><span className="roi-method-copy">Base pay, variable compensation, benefits, payroll burden, and management allocation.</span></p>
        <p><span>02</span><strong>Outbound infrastructure</strong><span className="roi-method-copy">Data, dialer, enrichment, CRM seats, and the rest of the prospecting stack.</span></p>
        <p><span>03</span><strong>Hiring + ramp drag</strong><span className="roi-method-copy">Recruiting costs, turnover, lower productivity during ramp, and months spent teaching the motion.</span></p>
        <p><span>04</span><strong>Revenue efficiency</strong><span className="roi-method-copy">Qualified conversations, conversion to opportunity, close rate, contract value, and gross margin.</span></p>
      </div>
    </section>
  </>;
}
