import { IUser } from "../model/user.ts";


let users: Array<IUser> = [{
  id: '1',
  name: 'Naruto Uzamaki',
  email: 'naruto.uzumaki@viladafolha.com.br',
  create_at: new Date('2020-05-20'),
  update_at: new Date('2020-05-20'),
},{
  id: '2',
  name: 'Uchira Sasuke',
  email: 'sasuke.uchira@akatsuki.com.br',
  create_at: new Date('2020-05-21'),
  update_at: new Date('2020-05-21'),
},{
  id: '3',
  name: 'Monkey D. Luffy',
  email: 'mokey.d.luffy@goingmerry.com.br',
  create_at: new Date('2020-05-22'),
  update_at: new Date('2020-05-22'),
},{
  id: '4',
  name: 'Izuku Midoriya',
  email: 'izuku.midoraya@heroes.com.br',
  create_at: new Date('2020-05-23'),
  update_at: new Date('2020-05-23'),
  
}];

const getUsers = (
  { response }: { response: any }) => { response.body = users;

};

const getUser = (
  { params, response }: { params: { id:string }; response:any },
  ) => {
    const user:IUser | undefined = users.find((user) => user.id === params.id);

    if (user) {
      response.status = 404;
      response.body = user;
    } else {
      response.status = 404;
      response.body = { message: "Usuario não encontrado! :("};     
    }
  };

  const addUser = async (
    { request, response }: { request: any; response: any },
    ) => {
    const body = await request.body();
    const user: IUser = body.value;

    user.create_at = new Date();
    user.update_at = new Date();

    users.push(user);

    response.body = {message: "OK :)"};
    response.status = 200;
  };

  const updateUser = async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
      },
    ) => {
      let user: IUser | undefined = users.find((user) => user.id === params.id);
      
      if (user) {
        const body = await request.body();
        const updateUser = { name?: string; email?: string } = body.value;

        user  = { ...user, ...updateUser, update_at: new Date() };
        users = [...users.filter((user) => user.id !== params.id), user];

        response.status = 200;
        response.body = { message: "OK ;)!"};
      } else {
        response.status = 404;
        response.body = { message: "Usuario não encontrado! :("};
      }
    };

    const deleteUser = (
      { params, response }: { params: { id: string }; response: any },
    ) => {
      users = users.filter((user) => user.id !== params.id);

      response.body = { message: "OK ;)! "};
      response.status = 200;
    };

export {getUsers, getUser, addUser, updateUser, deleteUser};