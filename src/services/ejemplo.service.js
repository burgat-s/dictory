/*
* Codigo conservado para tomar de ejemplo en la creacion de nuevos services
* usar con precaucion es derivado de un ejemplo de TS

const { Op } = require("sequelize");
const Empleado = require("../models/empleado.model");
const Candidato = require("../models/candidato.model");

 class AsistenciasService {
  async getAsistenciaByCalendario(calnro) {
    try {

      let message = '';

      // Find a Asistencia from ID Calendario
      const AsistenciaFinOne = await Asistencias.findOne({
        where: {
          [Op.and]: [
            { calnro: calnro }
          ]
        }
      });

      // Hask if have a Asistencia record
      if (AsistenciaFinOne === null) {
        return {
          ok: false,
          statusCode: 403,
          msg: 'Asistencia no encontrada.'
        }
      }

      return {
        ok: true,
        msg: message,
        data: {
          ternro: AsistenciaFinOne['ternro'],
          calnro: AsistenciaFinOne['calnro'],
          asievehorini: AsistenciaFinOne['asievehorini'],
        },
      };

    } catch (error) {

    }
  }

  async createAsistencia(ternro = 0, calnro = 0, empleg = 0, evenro = 0, dniscanned = '', asimotivo = '') {
    // Escenarios:
    if (!empty(ternro) && !empty(calnro) && empty(empleg) && empty(evenro) && empty(dniscanned)) // Escenario 1:
    {

      let findCalendario = await this.getCalendario(calnro);

      if (findCalendario.ok !== true) {
        return {
          ok: false,
          msg: findCalendario.msg,
          data: ''
        }
      }

      // preguntamos si existe una Asistencia con estas caracteristicas antes de guardarla.
      const asistencia = await Asistencias.findOne({
        where: {
          ternro: ternro,
          calnro: calnro,
          asievehorini: findCalendario.data['calhordes'],
          asievehorfin: findCalendario.data['calhorhas'],
          // asipre: -1,
        }
      })

      // Si no existe la Asistencia la creamos
      if(!asistencia) {
        try {
          let asistenciaObject = {
            ternro: ternro,
            calnro: calnro,
            asievehorini: findCalendario.data['calhordes'],
            asievehorfin: findCalendario.data['calhorhas'],
            asipre: -1,
            asiavi: 0,
            asivia: 0,
            asimotivo: asimotivo,
            gcabnro: null
          }
          let asistenciaCreate = await Asistencias.create(asistenciaObject);

          // TODO!!
          // Hacer sumatoria de horas y guardarlas en cap_candidatos

          return {
            ok: true,
            msg: 'Asistencia creada Correctamente',
            data: ''
          }

        } catch (error) {
          console.log(error);
          return {
            ok: false,
            msg: 'Error al crear la Asistencia',
            data: error
          }
        }
      }
      else
      {
        return {
          ok: false,
          msg: 'La asistencia ya existe',
          data: ''
        }
      }

    }
    else if (empty(ternro) && !empty(calnro) && !empty(empleg) && !empty(evenro) && empty(dniscanned)) // Escenario 2:
    {

      // Traemos datos del Calendario
      let findCalendario = await this.getCalendario(calnro);
      if (findCalendario.ok !== true) {
        return {
          ok: false,
          msg: findCalendario.msg,
          data: ''
        }
      }

      // Traemos datos del Empleado
      let findEmpleado = await this.getEmpleado(empleg);
      if (findEmpleado.ok !== true) {
        return {
          ok: false,
          msg: findEmpleado.msg,
          data: ''
        }
      }

      // Traemos datos del Evento
      let findEvento = await this.getEvento(evenro);
      if (findEvento.ok !== true) {
        return {
          ok: false,
          msg: findEvento.msg,
          data: ''
        }
      }

      // preguntamos si existe una Asistencia con estas caracteristicas antes de guardarla.
      const asistencia = await Asistencias.findOne({
        where: {
          ternro: findEmpleado.data['ternro'],
          calnro: calnro,
          asievehorini: findCalendario.data['calhordes'],
          asievehorfin: findCalendario.data['calhorhas'],
          // asipre: -1,
        }
      })

      // Si no existe la Asistencia la creamos
      if(!asistencia) {
        try {
          let asistenciaObject = {
            ternro: findEmpleado.data['ternro'],
            calnro: calnro,
            asievehorini: findCalendario.data['calhordes'],
            asievehorfin: findCalendario.data['calhorhas'],
            asipre: -1,
            asiavi: 0,
            asivia: 0,
            asimotivo: asimotivo,
            gcabnro: null
          }

          let asistenciaCreate = await Asistencias.create(asistenciaObject);

          // TODO!!
          // Hacer sumatoria de horas y guardarlas en cap_candidatos

          if (asistenciaCreate) {

            // agregamos el empleado como candidato usando el ternro de empleado
            // 1° - Preguntamos si existe el empleado como CANDIDATO
            const candidatoFindOne = await Candidato.findOne({
              where: {
                evenro: evenro,
                ternro: findEmpleado.data['ternro']
              }
            })

            // Si no existe el Candidato lo creamos
            if (!candidatoFindOne) {

              try {
                let candidatoObject = {
                  evenro: evenro,
                  ternro: findEmpleado.data['ternro'],
                  // orden: orden + 1,
                  confpart: 0,
                  canfecini: findEvento.data["evefecini"],
                  canfecfin: findEvento.data["evefecfin"],
                }

                let candidatoCreate = await Candidato.create(candidatoObject);

                return {
                  ok: true,
                  msg: 'Asistencia creada Correctamente',
                  data: ''
                }


              } catch (error) {
                console.log(error);
                return {
                  ok: false,
                  msg: 'Error al crear el Candidato',
                  data: error
                }
              }
            }

          }
          else
          {
            return {
              ok: false,
              msg: 'Error al crear la Asistencia',

              data: asistenciaCreate
            }
          }
          
          
        } catch (error) {
          console.log(error);
          return {
            ok: false,
            msg: 'Error al crear la Asistencia',
            data: error
          }
        }
      }
      else
      {
        return {
          ok: false,
          msg: 'La asistencia ya existe',
          data: ''
        }
      }


    }
    else if (empty(ternro) && !empty(calnro) && empty(empleg) && !empty(evenro) && !empty(dniscanned)) // Escenario 2:
    {

      // Traemos datos del Calendario
      let findCalendario = await this.getCalendario(calnro);
      if (findCalendario.ok !== true) {
        return {
          ok: false,
          msg: findCalendario.msg,
          data: ''
        }
      }

      // Traemos datos del Evento
      let findEvento = await this.getEvento(evenro);
      if (findEvento.ok !== true) {
        return {
          ok: false,
          msg: findEvento.msg,
          data: ''
        }
      }

      // Parseamos la informacion de el DNI escaneado
      // "00220429969@ALTAMIRANO@ENZO DANIEL@M@41440074@A@16/02/1999@25/09/2013"
      const externo_array = dniscanned.split("@");

      let adni = +externo_array[4];
      let birth_date = moment(externo_array[6], 'DD/MM/YYYY H:mm:ss').format('YYYY-MM-DD H:mm:ss');
      let emission_date = moment(externo_array[7], 'DD/MM/YYYY H:mm:ss').format('YYYY-MM-DD H:mm:ss');
      
      // Traemos datos del Externo
      let findExterno = await this.getExterno(adni);

      // Validamos si existe el usuario externo
      if (findExterno.ok !== true) { 
        
        // No existe Lo creamos
        const externoObject = {
          tramit_number:externo_array[0],
          last_name:externo_array[1],
          first_name:externo_array[2],
          sex:externo_array[3],
          dni:externo_array[4],
          // ?:externo_array[5],
          birth_date: birth_date,
          emission_date: emission_date
        }
        console.log('externo=========',externoObject);
        
        let externoCreate = await Externos.create(externoObject);

        if (!externoCreate) {
          return {
            ok: false,
            msg: 'Error al crear el Usuario Externo',
            data: externoCreate
          }
        }

      }

      // agregamos el usuario externo como candidato usando el DNI
      // 1° - Preguntamos si existe el Externo como CANDIDATO
      const candidatoFindOne = await Candidato.findOne({
        where: {
          evenro: evenro,
          ternro: adni
        }
      })

      // Si no existe el Candidato lo creamos
      if (!candidatoFindOne) { 

        try {
          let candidatoObject = {
            evenro: evenro,
            ternro: adni,
            // orden: orden + 1,
            confpart: 0,
            canfecini: findEvento.data["evefecini"],
            canfecfin: findEvento.data["evefecfin"],
          }

          let candidatoCreate = await Candidato.create(candidatoObject);

          // Por ultimo creamos la Asistencia
          let asistenciaObject = {
            ternro: adni,
            calnro: calnro,
            asievehorini: findCalendario.data['calhordes'],
            asievehorfin: findCalendario.data['calhorhas'],
            asipre: -1,
            asiavi: 0,
            asivia: 0,
            asimotivo: asimotivo,
            gcabnro: null
          }

          let asistenciaCreate = await Asistencias.create(asistenciaObject);

          if (asistenciaCreate) {
            return {
              ok: true,
              msg: 'Asistencia creada Correctamente',
              data: ''
            }
          }
          else
          {
            return {
              ok: false,
              msg: 'No se pudo crear la Asistencia',
              data: ''
            }
          }

          
        } catch (error) {
          console.log(error);
          return {
            ok: false,
            msg: 'Error al crear el Candidato',
            data: error
          }
        }
      }

      
      



    }
    else
    {
      return {
        ok: false,
        msg: 'Falta tratar caso 3 parseando datos del DNI escaneado',
        data: ''
      }
    }
    
  }

  async syncAsistencias(data: any) {
    try {
      const {asistencias, participantes} = data;

      for (const asistencia of participantes) {
        await this.addAsistencia(asistencia);
      }

      for (const asistencia of asistencias) {
        await this.addAsistencia(asistencia);
      }
      
      return {
        ok: true,
        msg: 'Sincronización realizada con exito'
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Error, no se pudo sincronizar'
      }
    }
  }

  private async addAsistencia(asistencia: any) {
    let ternro = asistencia.hasOwnProperty("ternro") ? Number(asistencia.ternro) : 0;
    let calnro = asistencia.hasOwnProperty("calnro") ? Number(asistencia.calnro) : 0;
    let empleg = asistencia.hasOwnProperty("empleg") ? Number(asistencia.empleg) : 0;
    let evenro = asistencia.hasOwnProperty("evenro") ? Number(asistencia.evenro) : 0;
    let dniscanned = asistencia.hasOwnProperty("dniscanned") ? String(asistencia.dniscanned) : "";
    let asimotivo = asistencia.hasOwnProperty("asimotivo") ? String(asistencia.asimotivo) : "";

    await this.createAsistencia(ternro, calnro, empleg, evenro, dniscanned, asimotivo);
  }


  // Recuperamos datos del calendario
  async getCalendario(calnro: number) {
    
    const CalendarioFindOne = await Calendario.findOne({
      where: {
        calnro: calnro
      }
    })

    // Hask if have a Calendar record
    if (CalendarioFindOne === null) {
      return {
        ok: false,
        msg: 'Calendario no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: CalendarioFindOne
      }
    }

  }

  // Recuperamos datos del empleado
  async getEmpleado(empleg: number) {
    
    const EmpleadoFindOne = await Empleado.findOne({
      where: {
        empleg: empleg
      }
    })

    // Hask if have a Calendar record
    if (EmpleadoFindOne === null) {
      return {
        ok: false,
        msg: 'Empleado no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: EmpleadoFindOne
      }
    }

  }

  // Recuperamos datos del Evento
  async getEvento(evenro: number) {
    
    const EventoFindOne = await Evento.findOne({
      where: {
        evenro: evenro
      }
    })

    // Hask if have a Calendar record
    if (EventoFindOne === null) {
      return {
        ok: false,
        msg: 'Evento no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: EventoFindOne
      }
    }

  }

  // Recuperamos datos de Usuario Externo
  async getExterno(dni: number) {
    
    const ExternoFindOne = await Externos.findOne({
      where: {
        dni: dni
      }
    })

    // Hask if have a Calendar record
    if (ExternoFindOne === null) {
      return {
        ok: false,
        msg: 'Usuario Externo no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: ExternoFindOne
      }
    }

  }

}

module.exports = AsistenciasService;

 */