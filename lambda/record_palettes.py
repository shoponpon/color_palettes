import sqlite3

db_name = "database.db"

def record_palette(colors):
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    count_query = "select count(*) from color_palettes;"
    insert_query = "insert into color_palettes ( color1, color2, color3, color4 ) values (\"{0}\",\"{1}\",\"{2}\",\"{3}\");".format(colors[0],colors[1],colors[2],colors[3])
    delete_query = "delete from color_palettes where created_at in ( select distinct color_palettes.created_at from color_palettes, color_palettes TMP where color_palettes.created_at < TMP.created_at group by color_palettes.created_at having count(*)>=10 );"
    try:
        #insert
        c.execute(insert_query)
        #check
        c.execute(count_query)
        if c.fetchone()[0] >= 10:
            c.execute(delete_query)
    except sqlite3.Error as e:
        pass
    conn.commit()
    conn.close()

def getPalettes():
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    palettes = []
    try:
        c.execute('select color1, color2, color3, color4 from color_palettes order by color_palettes.created_at desc limit 10;')
        palettes = c.fetchall()
    except sqlite3.Error as e:
        pass
    conn.close()
    return palettes
'''
if __name__ == '__main__':
    print(getPalettes())
'''