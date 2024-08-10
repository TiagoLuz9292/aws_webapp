import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap';

const AuthModal = ({ isOpen, toggle }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {isLogin ? 'Login' : 'Register'}
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" />
                </FormGroup>
                {!isLogin && (
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" />
                    </FormGroup>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>{isLogin ? 'Login' : 'Register'}</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            <div className="text-center mb-3">
                <Button color="link" onClick={toggleForm}>
                    {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
                </Button>
            </div>
        </Modal>
    );
};

export default AuthModal;
