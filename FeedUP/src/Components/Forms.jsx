import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import styles from './Forms.module.css';
import ControlledRadioButtonsGroup from './ControlledRadioButtonsGroup';
import ButtonSubmit from './ButtonSubmit';
export default function Forms() {
  return (
    
    <FormControl className={styles.loginForm} variant="standard">
      <label className='loginForm'>Nome completo</label>
      <InputLabel htmlFor="my-input"></InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" /> 
      <br></br>
      <label className='loginForm'>CPF</label>
      <InputLabel htmlFor="my-input"></InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text"/>
      <br></br>
      E-mail
      <InputLabel htmlFor="my-input"></InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text"/>
      <br></br>
      Senha
      <InputLabel htmlFor="my-input"></InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text"/>
      <br></br>
      <ControlledRadioButtonsGroup />
      <br></br>
      <ButtonSubmit />
    </FormControl>

  )
}
