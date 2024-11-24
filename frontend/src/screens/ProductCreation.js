import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  CreateProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
const ProductCreation = ({ location, history,match }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setstock] = useState(0)
    const [description, setDescription] = useState('')
    const [creating, setCreating] = useState(false)
    const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdProduct,
    pageNumber,
  ])


  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(CreateProduct(name,price,stock,category,description,brand,image))
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const fileType = file.type;
          if (fileType === 'image/jpeg' || fileType === 'image/png') {
            setImage(file);
          } else {
            alert('Please upload a JPG or PNG file.');
          }
        }
      };
  return (
    <FormContainer>
      <h1>New Product</h1>
      {errorCreate && <div>{errorCreate}</div>}
      {loadingCreate && <div>Loading...</div>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='stock'>
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type='name'
            placeholder='Number in stock'
            value={stock}
            onChange={(e) => setstock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='name'
            placeholder='.....'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='name'
            placeholder='..........'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
         <Form.Label>Image</Form.Label>
         <Form.Control
          type='file'
          accept="image/jpeg, image/png" onChange={handleImageUpload}/>
        </Form.Group>
        {image && (
        <div>
            <img src={URL.createObjectURL(image)} alt="Uploaded"/>
        </div>
        )}

        <Button type='submit' variant='primary'>
          Create
        </Button>
      </Form>
      </FormContainer>
  )
}
export default ProductCreation