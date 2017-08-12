import Schema from 'graphql-orm-mongoose'

export default Schema.model('Schedule').options({
  methods: {
    singularQuery: true,
    pluralQuery: true,
    add: true,
    update: true,
    delete: true
  }
}).fields({
  users: {
    $type: [String]
  },
  subject: {
    $type: String,
    required: true
  },
  date: {
    $type: Date
  }
}).queries({

}).statics({

})
