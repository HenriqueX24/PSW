// OpcaoSlider.jsx
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Slider
} from '@mui/material';

function OpcaoSlider({ questao, atualizarQuestao }) {
    const { id, slider } = questao;
    const { min, max, step, labelMin, labelMax } = slider;

    const handleSliderChange = (prop, value) => {
        const novoValor = prop === 'min' || prop === 'max' || prop === 'step' ? Number(value) : value;
        atualizarQuestao(id, { slider: { ...slider, [prop]: novoValor } });
    };
    
    // Configuração do Slider para visualização
    const marks = [
        { value: min, label: labelMin },
        { value: max, label: labelMax },
    ];

    return (
        <Box>
            <Typography gutterBottom>Preview do Slider:</Typography>
            <Slider
                value={[min]} // Usamos o valor mínimo para a pré-visualização
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                marks={marks}
                disabled
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Valor Mínimo"
                    type="number"
                    size="small"
                    value={min}
                    onChange={(e) => handleSliderChange('min', e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '120px' }}
                />
                <TextField
                    label="Valor Máximo"
                    type="number"
                    size="small"
                    value={max}
                    onChange={(e) => handleSliderChange('max', e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '120px' }}
                />
                <TextField
                    label="Step (Incremento)"
                    type="number"
                    size="small"
                    value={step}
                    onChange={(e) => handleSliderChange('step', e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '120px' }}
                />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                    label="Label Mínimo"
                    size="small"
                    value={labelMin}
                    onChange={(e) => handleSliderChange('labelMin', e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <TextField
                    label="Label Máximo"
                    size="small"
                    value={labelMax}
                    onChange={(e) => handleSliderChange('labelMax', e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
            </Box>
        </Box>
    );
}

export default OpcaoSlider;