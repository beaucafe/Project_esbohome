export class Drawer<ty> {
  contents: ty[] = []

  add = (object: ty) => this.contents.push(object)

  show = () => this.contents

  remove = () => this.contents.pop()
}
