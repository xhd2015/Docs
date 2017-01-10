----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    09:50:43 07/23/2016 
-- Design Name: 
-- Module Name:    WriteBack - Behavioral 
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

entity WriteBack is
	port(
		cs:in std_logic;
		cs_alu:in std_logic;
		data_in:in std_logic_vector(15 downto 0);
		reset:in std_logic;
		if_write,if_pc:in std_logic;
		
		pc_update:out std_logic;
		pc_out:out std_logic_vector(15 downto 0);
		reg_update:out std_logic;
		reg_out:out std_logic_vector(7 downto 0)
	);
end WriteBack;

architecture Behavioral of WriteBack is
signal flagReg:std_logic_vector(1 downto 0);
signal datatemp:std_logic_vector(15 downto 0);
begin
	
	datatemp<=data_in;
	
	process(reset,if_write,if_pc)--对没有寄存器的输入进行寄存
	begin
		if reset='1' then
				flagReg<=(others=>'0');
		else
			flagReg<=if_write & if_pc;
		end if;
	end process;
	
	
--	process(cs_stor,data_in)  --默认应当在cs而非cs_other的情况下读取输入
--	begin
--		if cs_stor='1' then --如果决定不使用寄存器，就需要同步读取输入，只有一个模块有寄存器即可
--			datatemp<=data_in;
--		end if;
--	end process;
	
	process(reset,cs)
	begin
		if reset='1' then
				pc_update<='0';
				reg_update<='0';
		elsif flagReg(1)='1' then
			if flagReg(0)='1' then
				pc_update<='1';reg_update<='0';
				pc_out<=datatemp;
			else
				pc_update<='0';reg_update<='1';
				reg_out<=datatemp(7 downto 0);
			end if;
		else
			pc_update<='0';reg_update<='0';
		end if;
	end process;


end Behavioral;

