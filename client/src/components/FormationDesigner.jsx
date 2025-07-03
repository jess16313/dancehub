import React, { useState, useRef } from 'react';

const FormationDesigner = () => {
  const [dancers, setDancers] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDancer, setCurrentDancer] = useState(null);
  const stageRef = useRef(null);

  const addDancer = () => {
    const newDancer = {
      id: Date.now(),
      x: 100,
      y: 100,
      label: `Dancer ${dancers.length + 1}`,
    };
    setDancers([...dancers, newDancer]);
  };

  const handleMouseDown = (e, dancer) => {
    setIsDragging(true);
    setCurrentDancer(dancer);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !currentDancer) return;

    const stage = stageRef.current;
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDancers(dancers.map(d => 
      d.id === currentDancer.id 
        ? { ...d, x, y }
        : d
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentDancer(null);
  };

  return (
    <div className="formation-designer">
      <div className="controls">
        <button onClick={addDancer}>Add Dancer</button>
      </div>
      <div 
        ref={stageRef}
        className="stage"
        style={{
          position: 'relative',
          width: '800px',
          height: '600px',
          border: '1px solid #ccc',
          margin: '20px auto'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {dancers.map(dancer => (
          <div
            key={dancer.id}
            style={{
              position: 'absolute',
              left: dancer.x - 20,
              top: dancer.y - 20,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              cursor: 'move',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              userSelect: 'none'
            }}
            onMouseDown={(e) => handleMouseDown(e, dancer)}
          >
            {dancer.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationDesigner; 