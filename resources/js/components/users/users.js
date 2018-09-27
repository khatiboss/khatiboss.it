export default {
    data() {
        return {
            users: {},
            // Create a new form instance
            userForm: new Form({
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
                        //console.log(risposta.data.message);
                        swal(
                            'Deleted!',
                            risposta.data.message,
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
                }else{
                    console.log(result.dismiss);
                }

            })
        },
        loadUsers() {
            axios.get('api/users').then(
                ({
                    data
                }) => (this.users = data.data));
        },

        createUser() {
            this.$Progress.start();

            this.userForm.post('api/users').then(() => {
                Fire.$emit('After_CRUD_Operation_Event');

                $('#addNewUserModalCenter').modal('hide')

                toast({
                    type: 'success',
                    title: 'User created successfully'
                })

                this.$Progress.finish();

            }).catch((error) => {
                console.log(error.message)
                this.$Progress.fail()
            });


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
