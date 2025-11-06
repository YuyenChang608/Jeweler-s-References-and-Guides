
import React, { useState, useMemo } from 'react';
import { GAUGE_DATA, RING_SIZE_DATA } from '../constants';

type ThicknessUnit = 'gauge' | 'mm';

const formatRingSize = (size: number): string => {
    const whole = Math.floor(size);
    const fraction = size - whole;
    if (fraction === 0) return `${whole}`;
    if (fraction === 0.25) return `${whole} 1/4`;
    if (fraction === 0.5) return `${whole} 1/2`;
    if (fraction === 0.75) return `${whole} 3/4`;
    return `${size}`;
};

const RingBlankCalculator: React.FC = () => {
    const [ringSize, setRingSize] = useState<string>('7');
    const [thicknessUnit, setThicknessUnit] = useState<ThicknessUnit>('gauge');
    const [thicknessGauge, setThicknessGauge] = useState<string>('18');
    const [thicknessMm, setThicknessMm] = useState<string>('1.024');
    const [bandWidth, setBandWidth] = useState<string>('3');

    const result = useMemo(() => {
        const sizeInfo = RING_SIZE_DATA.find(s => s.usSize === parseFloat(ringSize));
        if (!sizeInfo) return null;

        let metalThickness = 0;
        if (thicknessUnit === 'gauge') {
            const gaugeInfo = GAUGE_DATA.find(g => g.bnsGauge === parseInt(thicknessGauge));
            if (!gaugeInfo) return null;
            metalThickness = gaugeInfo.millimeters;
        } else {
            metalThickness = parseFloat(thicknessMm);
            if (isNaN(metalThickness)) return null;
        }

        const width = parseFloat(bandWidth);
        if (isNaN(width)) return null;

        const insideDiameter = sizeInfo.insideDiameter;
        let blankLength = (insideDiameter + metalThickness) * 3.14;

        if (width > 4) {
            blankLength += 0.5;
        }

        return blankLength.toFixed(2);

    }, [ringSize, thicknessUnit, thicknessGauge, thicknessMm, bandWidth]);

    const handleThicknessGaugeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGauge = e.target.value;
        setThicknessGauge(newGauge);
        const gaugeData = GAUGE_DATA.find(g => g.bnsGauge === parseInt(newGauge));
        if (gaugeData) {
            setThicknessMm(gaugeData.millimeters.toString());
        }
    }
    
    const UnitButton: React.FC<{ value: ThicknessUnit; children: React.ReactNode }> = ({ value, children }) => (
      <button
        onClick={() => setThicknessUnit(value)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${
          thicknessUnit === value ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {children}
      </button>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">Ring Blank Length Calculator</h2>
                <p className="text-slate-400 mt-1">Determine the correct length to cut your metal for a ring band.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="ring-size" className="block text-sm font-medium text-slate-300 mb-2">Ring Size (US)</label>
                    <select
                        id="ring-size"
                        value={ringSize}
                        onChange={(e) => setRingSize(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        {RING_SIZE_DATA.map(s => (
                            <option key={s.usSize} value={s.usSize}>{formatRingSize(s.usSize)}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="band-width" className="block text-sm font-medium text-slate-300 mb-2">Band Width (mm)</label>
                    <input
                        id="band-width"
                        type="number"
                        step="0.1"
                        min="0"
                        value={bandWidth}
                        onChange={(e) => setBandWidth(e.target.value)}
                        placeholder="e.g., 3"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Metal Thickness Unit</label>
                <div className="flex space-x-2">
                    <UnitButton value="gauge">B&S Gauge</UnitButton>
                    <UnitButton value="mm">Millimeters</UnitButton>
                </div>
            </div>
            
            {thicknessUnit === 'gauge' ? (
                <div>
                    <label htmlFor="thickness-gauge" className="block text-sm font-medium text-slate-300 mb-2">Thickness (B&S Gauge)</label>
                    <select
                        id="thickness-gauge"
                        value={thicknessGauge}
                        onChange={handleThicknessGaugeChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        {GAUGE_DATA.map(g => (
                            <option key={g.bnsGauge} value={g.bnsGauge}>{g.bnsGauge} Gauge ({g.millimeters}mm)</option>
                        ))}
                    </select>
                </div>
            ) : (
                <div>
                    <label htmlFor="thickness-mm" className="block text-sm font-medium text-slate-300 mb-2">Thickness (mm)</label>
                    <input
                        id="thickness-mm"
                        type="number"
                        step="0.001"
                        min="0"
                        value={thicknessMm}
                        onChange={(e) => setThicknessMm(e.target.value)}
                        placeholder="e.g., 1.024"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            )}


            {result && (
                <div className="pt-4">
                    <p className="text-sm font-medium text-slate-400">Calculated Ring Blank Length:</p>
                    <p className="text-4xl font-bold text-cyan-400 mt-1">{result} mm</p>
                    {parseFloat(bandWidth) > 4 && (
                        <p className="text-xs text-amber-400 mt-2">+0.5mm added for band width over 4mm.</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default RingBlankCalculator;
