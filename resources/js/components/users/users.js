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
        loadUsers() {
            axios.get('api/users').then(
                ({
                    data
                }) => (this.users = data.data));
        },
        createUser() {
            this.$Progress.start();

            this.userForm.post('api/users').then(() => {
                Fire.$emit('UserCreatedEvent');

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
        Fire.$on('UserCreatedEvent', () => {
            this.loadUsers();
        });

        //3rd - It can call method with pusher (pusher.com)
    }
}
