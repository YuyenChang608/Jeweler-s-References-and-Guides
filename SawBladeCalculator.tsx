
import React, { useState, useMemo } from 'react';
import { GAUGE_DATA } from '../constants';

type Unit = 'gauge' | 'mm';

const SawBladeCalculator: React.FC = () => {
  const [unit, setUnit] = useState<Unit>('gauge');
  const [gaugeValue, setGaugeValue] = useState<string>('18');
  const [mmValue, setMmValue] = useState<string>('1.024');

  const result = useMemo(() => {
    if (unit === 'gauge') {
      const gauge = parseInt(gaugeValue, 10);
      if (isNaN(gauge)) return null;
      const data = GAUGE_DATA.find(d => d.bnsGauge === gauge);
      return data ? data.sawBlade : null;
    } else {
      const mm = parseFloat(mmValue);
      if (isNaN(mm)) return null;
      if (GAUGE_DATA.length === 0) return null;

      const closest = GAUGE_DATA.reduce((prev, curr) => 
        Math.abs(curr.millimeters - mm) < Math.abs(prev.millimeters - mm) ? curr : prev
      );
      return closest.sawBlade;
    }
  }, [unit, gaugeValue, mmValue]);
  
  const handleGaugeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newGauge = e.target.value;
      setGaugeValue(newGauge);
      const gaugeData = GAUGE_DATA.find(d => d.bnsGauge === parseInt(newGauge));
      if (gaugeData) {
          setMmValue(gaugeData.millimeters.toString());
      }
  }

  const handleMmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMmValue(e.target.value);
  }
  
  const UnitButton: React.FC<{ value: Unit; children: React.ReactNode }> = ({ value, children }) => (
    <button
      onClick={() => setUnit(value)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${
        unit === value ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Saw Blade Selector</h2>
        <p className="text-slate-400 mt-1">Find the right saw blade for your metal thickness.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-300">Metal Thickness Unit</label>
        <div className="flex space-x-2">
          <UnitButton value="gauge">B&S Gauge</UnitButton>
          <UnitButton value="mm">Millimeters</UnitButton>
        </div>
      </div>
      
      {unit === 'gauge' ? (
        <div>
          <label htmlFor="bns-gauge" className="block text-sm font-medium text-slate-300 mb-2">B&S Gauge</label>
          <select
            id="bns-gauge"
            value={gaugeValue}
            onChange={handleGaugeChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            {GAUGE_DATA.map(g => (
              <option key={g.bnsGauge} value={g.bnsGauge}>{g.bnsGauge} Gauge ({g.millimeters}mm)</option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="millimeters" className="block text-sm font-medium text-slate-300 mb-2">Thickness (mm)</label>
          <input
            id="millimeters"
            type="number"
            step="0.001"
            value={mmValue}
            onChange={handleMmChange}
            placeholder="e.g., 1.024"
            className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      )}

      {result && (
        <div className="pt-4">
          <p className="text-sm font-medium text-slate-400">Recommended Saw Blade Size(s):</p>
          <p className="text-4xl font-bold text-cyan-400 mt-1">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SawBladeCalculator;
