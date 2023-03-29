
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';



test ('app functional renders without errors' , () => {
  render (<AppFunctional/>)
})

test ('button Up to ve visible', () => {

  render (<AppFunctional/>);

  const buttonUp = screen.getByRole('button', {name: /up/i});


  expect(buttonUp).toBeVisible();

})

test ('button Down to be visible' , () => {

  render (<AppFunctional/>);

  const buttonDown = screen.getAllByRole('button', {name: /down/i});

  expect(buttonDown).toBeVisible();

})

test ('button Right to be visible', () => {

  render (<AppFunctional/>);

  const buttonRight = screen.getByRole('button', {name: /right/i});

  expect(buttonRight).toBeVisible();

})

test ('button Left to be visible', () => {

  render (<AppFunctional/>);

  const buttonLeft = screen.getByRole('button', {name: /left/i});

  expect(buttonLeft).toBeVisible();

})

tet ('button Reset to be visible', () => {
  
  render (<AppFunctional/>);

  const buttonReset = screen.getByRole('button', {name: /reset/i});

  expect(buttonReset).toBeVisible();

})

test ("typing on the input results in it's value changing to the entered text", async() => {

  render (<AppFunctional/>);

  const emailField = screen.getByLabelText(/email*/i)

  userEvent.type(emailField, 'raphaelatech@gmail.com')

  await waitFor ( () => {
    const emailDisplay = screen.queryByText('raphaelatech@gmail.com')

    expect(emailDisplay).toBeInTheDocument();

  })
  
})
