export default {
    data() {
        return {
            editMode: false,
            users: {},
            // Create a new form instance
            userForm: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''

            })
        }
    },
    methods: {
        newUserModal() {
            this.editMode = false;
            this.userForm.reset();
            $('#userModalCenter').modal('show');
        },
        createUser() {
            this.$Progress.start();

            this.userForm.post('api/users').then(() => {
                Fire.$emit('After_CRUD_Operation_Event');

                $('#userModalCenter').modal('hide')

                toast({
                    type: 'success',
                    title: 'User created successfully'
                })

                this.$Progress.finish();

            }).catch((error) => {
                console.log(error.message)
                this.$Progress.fail()
            });


        },
        editUserModal(userObject) {
            //shift to edit mode
            this.editMode = true;
            //clear the form
            this.userForm.reset();
            //show the modal
            $('#userModalCenter').modal('show');
            //fill the user data into the form
            this.userForm.fill(userObject);
        },
        updateUser() {
            //console.log('Update user');
            this.$Progress.start();
            this.userForm.put('api/users/' + this.userForm.id).then((risposta) => {
                Fire.$emit('After_CRUD_Operation_Event');
                
                $('#userModalCenter').modal('hide')

                toast({
                    type: 'success',
                    title: risposta.data.messageFromLaravel
                })
                this.$Progress.finish();
            }).catch(() => {
                this.$Progress.fail()
            });
        },
        deleteUser(userId) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                //console.log(result);
                if (result.value) {
                    // sending delete request to the server
                    this.userForm.delete('api/users/' + userId).then((risposta) => {
                        //console.log(risposta.data.messageFromLaravel);
                        swal(
                            'Deleted!',
                            risposta.data.messageFromLaravel,
                            'success'
                        )
                        // reload page
                        Fire.$emit('After_CRUD_Operation_Event');
                    }).catch(() => {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })

                    });
                } else {
                    console.log(result.dismiss);
                }

            })
        },
        loadUsers() {
            axios.get('api/users').then(
                ({
                    data
                }) => (this.users = data.data));
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    created() {
        //On loading/efresh a page
        this.loadUsers();

        //1st - anonymous function call loadUsers() method every 3s
        //setInterval(() => this.loadUsers(), 3000);

        //2nd - Call method on event 'UserCreatedEvent'
        Fire.$on('After_CRUD_Operation_Event', () => {
            this.loadUsers();
        });

        //3rd - It can call method with pusher (pusher.com)
    }
}
