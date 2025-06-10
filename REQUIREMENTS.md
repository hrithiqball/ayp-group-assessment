Requirements
At AYP, it is important to ease our clients to update their employee’s information. You are the
selected Frontend Engineer to kick off this tool for the entire company.

1. Your app should read from employees.json to get the list of employees.

```json
{
  "employees": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@ayp-group.com",
      "isActive": true
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@ayp-group.com",
      "isActive": false
    },
    {
      "id": 3,
      "name": "Tom Smith",
      "email": "tom@ayp-group.com",
      "isActive": true
    }
  ]
}
```

2. You should create a React <Table> component to display the list of employees in a
   table. Note that the employee list could contain up to 1,000 data.

3. There should be a column at the rightmost of the table titled “Actions”. The column
   should contain a button labeled “Update”. The button should appear at each row of
   the record ONLY IF the employee is active.

4. When the “Update” button is clicked, it should display a modal with five components:

- TextInput to update the employee’s name.
- TextInput to update the employee’s email.
- Switch to update the employee’s isActive.
- Save button to save the updated information.
- Cancel button to dismiss the modal.

5. An illustration of the components can be found below. Please note that the colors and
   labels are only for illustration purposes; you are not to follow them. You are to design
   the best UI/UX that you think will best fit this use case.
