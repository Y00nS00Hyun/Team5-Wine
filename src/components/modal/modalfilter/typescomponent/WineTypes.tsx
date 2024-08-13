import { useState } from 'react';
import './WineTypes.scss';

interface WineTypesProps {
  selectedWineType: string;
  setSelectedWineType: (type: string) => void;
}

export default function WineTypes({ selectedWineType, setSelectedWineType }: WineTypesProps) {
  const handleWineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWineType(e.target.value.toUpperCase());
  };

  return (
    <div className="wine-types-container">
      <h3 className="wine-types-title">WINE TYPES</h3>
      <label className="radio-type">
        <input type="radio" value="RED" checked={selectedWineType === 'RED'} onChange={handleWineChange} />
        <span>Red</span>
      </label>
      <label className="radio-type">
        <input type="radio" value="WHITE" checked={selectedWineType === 'WHITE'} onChange={handleWineChange} />
        <span>White</span>
      </label>
      <label className="radio-type">
        <input type="radio" value="SPARKLING" checked={selectedWineType === 'SPARKLING'} onChange={handleWineChange} />
        <span>Sparkling</span>
      </label>
    </div>
  );
}
