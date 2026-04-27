import React from "react"

function ContactDetail({contactArray,deleteById})
{
    return(
        <>
        <table className="table">
  <thead>
    <tr>
      <th>Serial No</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Question</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>

        {
            contactArray.map((cobj)=>{

                return(

                    <tr key={cobj.id}>

                        <td>{cobj.id}</td>
                        <td>{cobj.name}</td>
                        <td>{cobj.email}</td>
                        <td>{cobj.phone}</td>
                        <td>{cobj.question}</td>

                        <td>

                            <button className="btn btn-danger"
                            onClick={()=>deleteById(cobj.id)}>

                                Delete

                            </button>

                        </td>

                    </tr>

                )

            })
        }

        </tbody>

        </table>
        </>
    )
}

export default ContactDetail