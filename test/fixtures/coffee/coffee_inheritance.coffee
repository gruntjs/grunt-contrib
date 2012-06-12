class Base
  @val: 'hello'
  @test: 'test'

class Derived extends Base
  @test: @val
