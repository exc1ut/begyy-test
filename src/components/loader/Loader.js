import React from 'react'
import styled, { css, keyframes } from 'styled-components'

// Animation
const animation = ({ from, to }) => keyframes`
  from {background: ${from};} to {background: ${to};}
`

// Styles
const LoaderWrap = styled.div`
  display: block;
  position: relative;
  width: ${({ size }) => (size ? size * 35 : 35)}px;
  height: ${({ size }) => (size ? size * 35 : 35)}px;
  margin: 10px auto;
`
const Inner = styled.div`
  width: ${({ size }) => (size && size >= 2 ? 3 : 1.5)}px;
  height: ${({ size }) => (size ? size * 8 : 8)}px;
  background: #fff;
  position: absolute;
  left: 49.5%;
  top: 39%;
  border-radius: 12px;
  animation: ${({ color }) => animation(color)} 1s linear infinite;
  ${({ count }) =>
    count === 'one' &&
    css`
      transform: rotate(-330deg) translate(0px, -142%);
      animation-delay: -0.916s;
    `}
  ${({ count }) =>
    count === 'two' &&
    css`
      transform: rotate(-300deg) translate(0px, -142%);
      animation-delay: -0.833s;
    `}
  ${({ count }) =>
    count === 'three' &&
    css`
      transform: rotate(-270deg) translate(0px, -142%);
      animation-delay: -0.75s;
    `}
  ${({ count }) =>
    count === 'four' &&
    css`
      transform: rotate(-240deg) translate(0px, -142%);
      animation-delay: -0.666s;
    `}
  ${({ count }) =>
    count === 'five' &&
    css`
      transform: rotate(-210deg) translate(0px, -142%);
      animation-delay: -0.583s;
    `}
  ${({ count }) =>
    count === 'six' &&
    css`
      transform: rotate(-180deg) translate(0px, -142%);
      animation-delay: -0.5s;
    `}
  ${({ count }) =>
    count === 'seven' &&
    css`
      transform: rotate(-150deg) translate(0px, -142%);
      animation-delay: -0.416s;
    `}
  ${({ count }) =>
    count === 'eight' &&
    css`
      transform: rotate(-120deg) translate(0px, -142%);
      animation-delay: -0.333s;
    `}
  ${({ count }) =>
    count === 'nine' &&
    css`
      transform: rotate(-90deg) translate(0px, -142%);
      animation-delay: -0.25s;
    `}
  ${({ count }) =>
    count === 'ten' &&
    css`
      transform: rotate(-60deg) translate(0px, -142%);
      animation-delay: -0.166s;
    `}
  ${({ count }) =>
    count === 'eleven' &&
    css`
      transform: rotate(-30deg) translate(0px, -142%);
      animation-delay: -0.083s;
    `}
  ${({ count }) =>
    count === 'twelve' &&
    css`
      transform: rotate(-0deg) translate(0px, -142%);
      animation-delay: 0s;
    `}
`

// Component
const Loader = props => {
  const {
    className,
    size = 1,
    color = {
      from: '#000',
      to: '#fff'
    }
  } = props

  return (
    <LoaderWrap className={className} size={size}>
      <Inner size={size} color={color} count="one" />
      <Inner size={size} color={color} count="two" />
      <Inner size={size} color={color} count="three" />
      <Inner size={size} color={color} count="four" />
      <Inner size={size} color={color} count="five" />
      <Inner size={size} color={color} count="six" />
      <Inner size={size} color={color} count="seven" />
      <Inner size={size} color={color} count="eight" />
      <Inner size={size} color={color} count="nine" />
      <Inner size={size} color={color} count="ten" />
      <Inner size={size} color={color} count="eleven" />
      <Inner size={size} color={color} count="twelve" />
    </LoaderWrap>
  )
}

export default Loader
