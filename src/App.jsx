import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
  const [name, setName] = useState('');
  const [expense, setExpense] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Load items from localStorage when component mounts
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const handleAdd = () => {
    if (name == "" || expense == "") {
      toast.dismiss()
      toast.error("Fill the box correctly")
      return
    }
    // Create a new item object
    const newItem = {
      date: getDate(),
      name: name,
      expense: expense
    };

    // Update items array with the new item
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Store items in localStorage
    localStorage.setItem('items', JSON.stringify(updatedItems));
    toast.dismiss()
    toast.success("Kharcha added...!")
    // Clear input fields
    setName('');
    setExpense('');
  };

  const handleDelete = (index) => {
    // Remove item at the specified index
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);

    // Update localStorage
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };


  function getDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDate = (day < 10 ? "0" : "") + day + "-" + (month < 10 ? "0" : "") + month + "-" + year;
    return formattedDate;
  }
  const calculateTotalExpenses = () => {
    return items.reduce((total, currentItem) => total + parseFloat(currentItem.expense), 0);
  };

  const isNumber = (value) => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleExpenseChange = (value) => {
    // Check if the input value is a valid number
    if (isNumber(value) || value === '') {
      setExpense(value);
    }
  };
  const handleEdit = (index) => {
    // Set editIndex to the index of the item to be edited
    setEditIndex(index);
    setIsEdit(true);
    // Populate input fields with the item's current values
    setName(items[index].name);
    setExpense(items[index].expense);
    document.getElementById('my_modal_5').showModal()
  };

  const handleSaveEdit = () => {

    // Create a copy of the items array
    const updatedItems = [...items];
    // Update the item at the editIndex with the new values
    // setEditIndex(index);
    updatedItems[editIndex] = { ...updatedItems[editIndex], name: name, expense: expense };
    // Update the state with the updated items array
    setItems(updatedItems);
    // Update localStorage
    localStorage.setItem('items', JSON.stringify(updatedItems));
    // Reset editIndex and clear input fields
    setIsEdit(false)
    setEditIndex(null);
    setName('');
    setExpense('');
  };

  const handleClose = () => {
    setEditIndex(null);
    setIsEdit(false)
    setName("")
    setExpense("")
  }


  return (
    <div>
      <Header />
      <Toaster />
      <div className='flex flex-col items-center '>
        <div className='flex flex-col items-center m-6 '>
          <button className='btn btn-outline btn-primary w-80 text-lg h-12  sticky top-20 z-10' onClick={() => document.getElementById('my_modal_5').showModal()}>Add Expense</button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <div className='flex flex-col items-center gap-4'>
                <input value={name}
                  onChange={(e) => setName(e.target.value)} type="text" placeholder="Name of goods" className="input input-bordered input-primary w-full max-w-xs" />
                <input value={expense}
                  onChange={(e) => handleExpenseChange(e.target.value)} type="text" placeholder="Expense" className="input input-bordered input-primary w-full max-w-xs" />
                {!isEdit ? (
                  <button onClick={handleAdd} className='btn btn-primary w-full max-w-xs text-lg  '>Add</button>
                ) : (
                  <button onClick={handleSaveEdit} className='btn btn-primary w-full max-w-xs text-lg  '>Save</button>
                )}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={handleClose}>Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="overflow-visible">
            <table className="table">
              <thead>
                <tr className='text-lg'>
                  <th>Date</th>
                  <th>Goods</th>
                  <th>Expense</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>₹{item.expense}</td>
                        <td>
                          <div className="dropdown  ">
                            <div tabIndex={0} role="button" className="btn ">
                              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow-lg bg-base-100">
                              <li>
                                <a>
                                  <svg role='button' onClick={() => handleDelete(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <svg role='button' onClick={() => handleEdit(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="badge badge-ghost badge-lg text-xl w-40 shadow-md h-10 z-10 sticky bottom-0  ">Total: ₹{calculateTotalExpenses()}</div>
      </div>
    </div>
  )
}
export default App;
