import { styled } from '../../styles'

export const TextInputContainer = styled('div', {
  backgroundColor: '$gray900',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $gray900',
  display: 'flex',
  alignItems: 'baseline',
  transition: 'ease 200ms',

  svg: {
    width: '$5',
    height: '$5',
    mr: '$1',
    alignSelf: 'center',
    color: '$gray400',
  },

  '&:has(input:focus)': {
    border: '1px solid $secondary',
    svg: {
      color: '$secondary',
    },
  },

  '&:has(input:not(:placeholder-shown))': {
    svg: {
      color: '$secondary',
    },
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const Input = styled('input', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$white',
  fontWeight: 'regular',
  background: 'transparent',
  border: 0,
  width: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:placeholder': {
    color: '$gray400',
  },
})
