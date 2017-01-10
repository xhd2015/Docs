----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    09:19:24 07/23/2016 
-- Design Name: 
-- Module Name:    StorageManager - Behavioral 
-- Project Name: 
-- Target Devices: 
-- Tool versions: 
-- Description: 
--
-- Dependencies: 
--
-- Revision: 
-- Revision 0.01 - File Created
-- Additional Comments: 
--
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity StorageManager is
	port(
		cs:in std_logic;
		cs_alu:in std_logic;
		cs_writ:in std_logic;
		reset:in std_logic;
		res_in:in std_logic_vector(15 downto 0);
		m_datain:in std_logic_vector(7 downto 0);
		if_extern,if_io,if_read:in std_logic;
			--0  1 2 3 4 三位 xyz  x=0  x=1 y=
		
		iord,iowr:out std_logic;
		sta,lda:out std_logic;
		data_out:out std_logic_vector(15 downto 0)
	);
end StorageManager;

architecture Behavioral of StorageManager is
	signal RTemp:std_logic_vector(15 downto 0);
	signal RTempFromAlu:std_logic_vector(15 downto 0);
	signal RTempFromMem:std_logic_vector(7 downto 0);
	signal flagReg:std_logic_vector(2 downto 0);
begin

	RTempFromAlu<=res_in;
	RTempFromMem<=m_datain;
	
	process(reset,if_extern,if_io,if_read)--依据连线关系来进行构造
	begin
		if reset='1' then
			flagReg<=(others=>'0');
		elsif cs_alu='1' then
			flagReg<=if_extern & if_io & if_read;
		end if;
	end process; --如果有寄存器，就可以延迟输出，接收方不必寄存；如果没有，就需要立即输出，接收方寄存
	
	data_out(15 downto 8)<=RTempFromAlu(15 downto 8);
	data_out(7 downto 0)<=RTempFromAlu(7 downto 0) when flagReg(2)='0' else
								RTempFromMem;
	
	process(reset,cs)--在选中的时候才有输出
	begin
		if reset='1' then
			sta<='0';
			lda<='0';
			iord<='0';
			iowr<='0';
		elsif  cs='0' then
			sta<='0';
			lda<='0';
			iord<='0';
			iowr<='0';
		elsif flagReg(2)='1' then --仅在cs的情况下输出(控制信号+数据信号)
				if flagReg(1)='0' then --非io模式
					if flagReg(0)='1' then --读模式
						lda<='1';sta<='0';iord<='0';iowr<='0';
					else
						sta<='1';lda<='0';iord<='0';iowr<='0';
					end if;
				else --io模式
					if flagReg(0)='1' then --io读
						lda<='0';sta<='0';iord<='1';iowr<='0';
					else
						lda<='0';sta<='0';iord<='0';iowr<='1';
					end if;
				end if;
		else
				sta<='0';lda<='0';iord<='0';iowr<='0';
		end if;
	end process;

end Behavioral;

