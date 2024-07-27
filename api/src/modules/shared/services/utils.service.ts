import bcrypt from 'bcrypt';

export class UtilsService {
  static generatePinCode(length = 4): number {
    return (
      Math.floor(Math.random() * parseInt('9'.padEnd(length, '0'))) +
      parseInt('1'.padEnd(length, '0'))
    );
  }

  static dateToSqlString(date: Date): string {
    return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getUTCDay().toString().padStart(2, '0')} ${date
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
  }

  static calculateDistance(
    p1: { lat: number; lng: number },
    p2: { lat: number; lng: number },
  ): number {
    const d: number =
      Math.acos(
        Math.sin((Math.PI * p1.lat) / 180) *
          Math.sin((Math.PI * p2.lat) / 180) +
          Math.cos((Math.PI * p1.lat) / 180) *
            Math.cos((Math.PI * p2.lat) / 180) *
            Math.cos((Math.PI * p2.lng) / 180 - (Math.PI * p1.lng) / 180),
      ) * 6371;
    return parseFloat(Math.abs(d).toFixed(2));
  }

  static getPreviousDay(date = new Date()): Date {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }
  static getNextDay(date = new Date()): Date {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() + 1);
    return previous;
  }

  static getDuration(
    firstDate: Date,
    lastDate: Date,
  ): {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  } {
    const milliseconds = lastDate.getTime() - firstDate.getTime();
    return {
      milliseconds,
      seconds: milliseconds / 1000,
      minutes: milliseconds / 60000,
      hours: milliseconds / 3600000,
      days: milliseconds / 86400000,
    };
  }

  static getDurationAbs(
    firstDate: Date,
    lastDate: Date,
  ): {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  } {
    const milliseconds = Math.abs(lastDate.getTime() - firstDate.getTime());
    return {
      milliseconds,
      seconds: milliseconds / 1000,
      minutes: milliseconds / 60000,
      hours: milliseconds / 3600000,
      days: milliseconds / 86400000,
    };
  }

  static async generateUniqueString(
    arg: { id?: number | string; length?: number } = {},
  ): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash((arg.id || 0).toString(), salt);
    return hash
      .replace(/[^\w]/gi, '')
      .substring(0, arg.length || 6)
      .toUpperCase();
  }
}
