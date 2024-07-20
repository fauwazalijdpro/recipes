export function sortByProperty(array:any, prop:string, reverse:boolean) {
    reverse = !reverse
    array.sort((a:any, b:any) => {
      let nameA = a[prop].toLowerCase();
      let nameB = b[prop].toLowerCase();
      
      if (nameA < nameB) {
        return reverse ? 1 : -1; // this.Reverse order if reverse is true
      }
      if (nameA > nameB) {
        return reverse ? -1 : 1; // this.Reverse order if reverse is true
      }
      return 0;
    });
  }