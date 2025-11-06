
import React, { useState, useMemo } from 'react';
import { GAUGE_DATA } from '../constants';

const DrillBitCalculator: React.FC = () => {
  const [gaugeValue, setGaugeValue] = useState<string>('18');

  const result = useMemo(() => {
    const gauge = parseInt(gaugeValue, 10);
    if (isNaN(gauge)) return null;
    const data = GAUGE_DATA.find(d => d.bnsGauge === gauge);
    return data ? data.drillSize : null;
  }, [gaugeValue]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Drill Bit Selector</h2>
        <p className="text-slate-400 mt-1">Find the correct drill bit for your wire gauge.</p>
      </div>

      <div>
        <label htmlFor="wire-gauge" className="block text-sm font-medium text-slate-300 mb-2">Wire Gauge (B&S)</label>
        <select
          id="wire-gauge"
          value={gaugeValue}
          onChange={(e) => setGaugeValue(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
        >
          {GAUGE_DATA.map(g => (
            <option key={g.bnsGauge} value={g.bnsGauge}>{g.bnsGauge} Gauge</option>
          ))}
        </select>
      </div>

      {result && (
        <div className="pt-4">
          <p className="text-sm font-medium text-slate-400">Recommended Drill Bit Size:</p>
          <p className="text-4xl font-bold text-cyan-400 mt-1">{result}</p>
          <p className="text-xs text-slate-500 mt-2">*If gauge size is between two drill sizes, the next larger drill size is indicated.</p>
        </div>
      )}
    </div>
  );
};

export default DrillBitCalculator;
