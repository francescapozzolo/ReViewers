// import React from 'react'

// const Modal = (props) => {
//     const divStyle = { 
//         display: props.displayModal ? 'block' : 'none'
//    };

//    function closeModal(e) {
//       e.stopPropagation()
//       props.closeModal()
//    }

//    return (
//         <div className="modal" onClick={ closeModal } style={divStyle}>
//             <div className="modal-content" onClick={ e => e.stopPropagation() }>
//                 <span className="close" onClick={ closeModal }>&times;</span>
//                 <div>
//                     <span>Reviewers</span>
//                     <span>{props.title}</span>
//                     <div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//    );
// }

// export default Modal;