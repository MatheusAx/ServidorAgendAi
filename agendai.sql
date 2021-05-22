create database AgendAi;
Use AgendAi;
create table Usuario(
idsuario  int auto_increment primary key,
nome varchar(50) not null,
telefone varchar (50) not null,
email varchar (50) not null
) engine innodb;

create table Servico(
idservico int auto_increment primary key,
Servico varchar(50) not null,
Pagamento varchar (50) not null,
Agendamento varchar(20) not null 
) engine innodb;

select * from servico

insert into Usuario( nome, telefone, email) 
values "Caio","1198787-7878","caio@email.com")