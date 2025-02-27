// const CREATE_POST = gql`
//   mutation CreatePost($title: String!, $content: String!) {
//     postCreate(post: { title: $title, content: $content }) {
//       userErrors {
//         message
//       }
//       post {
//         title
//         createdAt
//         content
//         user {
//           name
//         }
//       }
//     }
//   }
// `;

import { useState } from "react";

const NewPostModal = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [addPost, { data, loading }] = useMutation(CREATE_POST);

  // const handleClick = () => {
  //   addPost({
  //     variables: {
  //       title,
  //       content,
  //     },
  //   });
  // };

  return (
    <>
      <button
      // onClick={handleShow}
      >
        Add Post
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClick}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewPostModal;
