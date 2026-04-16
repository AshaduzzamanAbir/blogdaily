import React from "react"


const SubsTableItem = ({mongoId , email , deleteEmail , date}) => {

  const SubscriptionDate = new Date(date)

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='items-center justify-center gap-5 hidden sm:flex px-6 py-4 text-gray-900 whitespace-nowrap'>
        <p className='capitalize font-medium'>{email?email:'No Email Avable'}</p>
      </th>      
      <td className='px-6 py-4 text-center'>
        {SubscriptionDate.toDateString()}
      </td>
      <td className='px-6 py-4 text-center '>
        <span onClick={()=>deleteEmail(mongoId)} className='cursor-pointer'>X</span>
      </td>
    </tr>
  )
}

export default SubsTableItem