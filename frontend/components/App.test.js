
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';



test ('app functional renders without errors' , () => {
  render (<AppFunctional/>)
})

test ('button Up to be visible', () => {

  render (<AppFunctional/>);

  const buttonUp = document.querySelector('#up')


  expect(buttonUp).toBeVisible;

})

test ('button Down to be visible' , () => {

  render (<AppFunctional/>);

  const buttonDown = document.querySelector('#down')

  expect(buttonDown).toBeVisible;

})

test ('button Right to be visible', () => {

  render (<AppFunctional/>);

  const buttonRight = document.querySelector('#right')

  expect(buttonRight).toBeVisible;

})

test ('button Left to be visible', () => {

  render (<AppFunctional/>);

  const buttonLeft = document.querySelector('#left')

  expect(buttonLeft).toBeVisible;

})

test ('button Reset to be visible', () => {
  
  render (<AppFunctional/>);

  const buttonReset = document.querySelector('#reset')

  expect(buttonReset).toBeVisible;

})

test ("typing on the input results in it's value changing to the entered text", async() => {

  render (<AppFunctional/>);

  const emailField = document.querySelector('#email')

  fireEvent.type(emailField, 'raphaelatech@gmail.com')

  await waitFor ( () => {
    const emailDisplay = screen.queryByText('raphaelatech@gmail.com')

    expect(emailDisplay).toBeInTheDocument();

  })

})
